import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ENTER: /LIMEN" },
    { name: "Enter LIMEN web app", content: "" },
  ];
}


import React, { useEffect, useState } from 'react';
import SceneSelector from '../components/SceneSelector';
import SceneViewer from '../components/SceneViewer';
import type { Scene } from '../types/Scene';
import styles from './home.module.css'
import Background from '../components/Background';
import { Welcome } from "../components/Welcome";

import welcomeScreenSound from '../assets/audio/LOOP_ACCESSO.wav';
import selectionSound from '../assets/audio/LOOP_SCHERMATA.wav';
import welcomeVideo from '../assets/videos/ENTRATA.mp4';
import RotateScreenPrompt from "~/components/RotateScreenPrompt";

const AUDIO_FADE_DURATION = 100;               // Durata del fade-out in millisecondi

const welcomeScene: Scene = { id: 0, name: 'Welcome', src: welcomeVideo, thumbnail: "", }

// Funzione per il fade-out
const fadeOut = (audio: HTMLAudioElement): Promise<void> => {
  return new Promise((resolve) => {
    let volume = audio.volume;
    const interval = setInterval(() => {
      if (volume > 0) {
        volume = Math.max(0, volume - 0.1); // Decremento del volume
        audio.volume = volume;
      } else {
        clearInterval(interval);
        audio.pause();
        resolve(); // Fade-out completato
      }
    }, AUDIO_FADE_DURATION / 10);
  });
};

// Funzione per il fade-in (al momento fade istantaneo)
const fadeIn = (audio: HTMLAudioElement): void => {
  audio.muted = true;
  audio.play().catch((error) => console.error('Errore nel riprodurre l\'audio:', error))
  .then(() => {
    audio.muted = false;
    audio.volume = 1;
  });
};

export default function Home(){
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);


  useEffect(() => {
    let fadeOutInProgress = false; // Flag per impedire sovrapposizioni di fade-out

    const switchAudio = async () => {
      if (fadeOutInProgress) return;

      if (audio) {
        fadeOutInProgress = true;
        await fadeOut(audio);
        fadeOutInProgress = false;
      }

      if (selectedScene) return;
      const newAudio = new Audio(welcomeScreen ? welcomeScreenSound : selectionSound);
      newAudio.loop = true;
      setAudio(newAudio);
      fadeIn(newAudio);
    };

    switchAudio();
  }, [welcomeScreen, selectedScene]);

  // selezione scena
  const onSceneSelect = (scene: Scene) => {
    if (selectedScene) return;
    if (scene.name === 'Exit') {
      setIsFadingOut(true);
      setTimeout(() => {
        setWelcomeScreen(true);
        setIsFadingOut(false);
      }, 3000); // Tempo di attesa per il fade-in
    }
    else {
      setSelectedScene(scene);
    }
  }


  // gestione welcomescreen e activity flag
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent|MouseEvent) => {
      if (welcomeScreen) {
        setSelectedScene(welcomeScene)
        setTimeout(() => {
          setWelcomeScreen(false);
        }, 1000); // Tempo di attesa per il fade-in
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleKeyDown);
    };
  }, [welcomeScreen]);

  return (
    <div className="Home" style={{ margin: '0px', padding: '0px', overflow: 'hidden', height: '100%', width: '100%',  }}>
      <RotateScreenPrompt />
      {welcomeScreen &&
        <Welcome />
      }
      {selectedScene && (
        <SceneViewer scene={selectedScene} onBack={() => setSelectedScene(null)} />
      )}
      {!welcomeScreen &&
        <div className={styles.maincontainer + (isFadingOut ? ' ' + styles.fadeOut : '')
        }>
          <Background />
          <SceneSelector onSelect={onSceneSelect} />
        </div>
      }
      {isFadingOut &&
        <div className={styles.overlay} />
      }

    </div>
  );
};