import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const container$1 = "_container_1eofz_1";
const grid = "_grid_1eofz_11";
const button = "_button_1eofz_24";
const image = "_image_1eofz_65";
const text = "_text_1eofz_71";
const exitButton = "_exitButton_1eofz_86";
const exitText = "_exitText_1eofz_109";
const styles$2 = {
  container: container$1,
  grid,
  button,
  image,
  text,
  exitButton,
  exitText
};
const video0 = "/assets/CHIA1-DM-FX2G-.mp4";
const video1 = "/assets/GAB1-B7qYz0rx.mp4";
const video2 = "/assets/FRA1-DuZrKyxU.mp4";
const video3 = "/assets/FRA2-BOaTvH3r.mp4";
const video4 = "/assets/TOMM1-DtBRhv0R.mp4";
const video5 = "/assets/GAB2-Dmx_Iq4x.mp4";
const video6 = "/assets/TOMM2-BQHDMfDg.mp4";
const video7 = "/assets/CHIA2-BytBPtmd.mp4";
const image0 = "/assets/CHIA1-VJhb5qTN.png";
const image1 = "/assets/GAB1-BjYOlqs5.png";
const image2 = "/assets/FRA1-CORXgWYU.png";
const image3 = "/assets/FRA2-CkMZjI-e.png";
const image4 = "/assets/TOMM1-CIMTA1ev.png";
const image5 = "/assets/GAB2-BjyKgc6w.png";
const image6 = "/assets/TOMM2-Bw-5ws7S.png";
const image7 = "/assets/CHIA2-CvAoUsP0.png";
const exitScene = { id: 8, name: "Exit", src: "", thumbnail: "" };
const scenes = [
  { id: 1, name: "Ek129-12.mp4", src: video0, thumbnail: image0 },
  { id: 2, name: "a00.avi", src: video1, thumbnail: image1 },
  { id: 3, name: "?_.mov", src: video2, thumbnail: image2 },
  { id: 4, name: "77.avi", src: video3, thumbnail: image3 },
  { id: 5, name: "=-00.mpeg", src: video4, thumbnail: image4 },
  { id: 6, name: "Ge029.mp4", src: video5, thumbnail: image5 },
  { id: 7, name: "ijks.wmv", src: video6, thumbnail: image6 },
  { id: 8, name: "5__01.mp4", src: video7, thumbnail: image7 }
];
const SceneSelector = ({ onSelect }) => {
  return /* @__PURE__ */ jsxs("div", { className: styles$2.container, children: [
    /* @__PURE__ */ jsx("div", { className: styles$2.grid, children: scenes.map((scene) => /* @__PURE__ */ jsxs(
      "button",
      {
        className: styles$2.button,
        onClick: () => {
          onSelect(scene);
        },
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: styles$2.image,
              src: scene.thumbnail,
              alt: scene.name,
              style: { width: "100%" }
            }
          ),
          /* @__PURE__ */ jsx(
            "text",
            {
              className: styles$2.text,
              children: scene.name
            }
          )
        ]
      },
      scene.id
    )) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: styles$2.exitButton,
        onClick: () => onSelect(exitScene),
        children: /* @__PURE__ */ jsx("text", { className: styles$2.exitText, children: "EXIT" })
      }
    )
  ] });
};
const container = "_container_hj2t6_1";
const videoWrapper = "_videoWrapper_hj2t6_14";
const fadeOut$2 = "_fadeOut_hj2t6_38";
const backButton = "_backButton_hj2t6_51";
const fadeIn$1 = "_fadeIn_hj2t6_90";
const styles$1 = {
  container,
  videoWrapper,
  fadeOut: fadeOut$2,
  backButton,
  fadeIn: fadeIn$1
};
const SceneViewer = ({ scene, onBack, loop }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  useEffect(() => {
    setIsFadingIn(true);
  }, []);
  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(onBack, 1e3);
  };
  return /* @__PURE__ */ jsx("div", { className: styles$1.container, children: /* @__PURE__ */ jsxs("div", { className: styles$1.videoWrapper, children: [
    /* @__PURE__ */ jsx(
      "video",
      {
        src: scene.src,
        controls: true,
        autoPlay: true,
        onEnded: handleVideoEnd,
        className: isFadingOut ? styles$1.fadeOut : isFadingIn ? styles$1.fadeIn : "",
        loop
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleVideoEnd,
        className: styles$1.backButton
      }
    )
  ] }) });
};
const maincontainer = "_maincontainer_zghyi_36";
const fadeOut$1 = "_fadeOut_zghyi_59";
const overlay = "_overlay_zghyi_111";
const styles = {
  maincontainer,
  fadeOut: fadeOut$1,
  overlay
};
const Background = () => {
  return /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx("div", { className: "top-plane" }),
    /* @__PURE__ */ jsx("div", { className: "bottom-plane" })
  ] });
};
const Welcome = () => {
  return /* @__PURE__ */ jsx("div", { className: "welcome", children: /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 300 200",
      preserveAspectRatio: "xMidYMid slice",
      width: "100%",
      height: "100%",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("filter", { id: "Glow", x: "-30%", y: "-30%", width: "160%", height: "160%", children: [
            /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "6 2", result: "glow" }),
            /* @__PURE__ */ jsxs("feMerge", { children: [
              /* @__PURE__ */ jsx("feMergeNode", { in: "glow" }),
              /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("pattern", { id: "Grid", x: "0", y: "0", width: "0.2", height: "0.2", children: [
            /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: "100px", height: "100px", stroke: "yellow", fill: "transparent", "stroke-width": "2" }),
            /* @__PURE__ */ jsx("rect", { x: "2", y: "0", width: "100px", height: "100px", stroke: "blue", fill: "transparent", "stroke-width": "2" }),
            /* @__PURE__ */ jsx("animateTransform", { attributeType: "xml", attributeName: "patternTransform", type: "translate", values: "0,0;60,40", dur: "5s", repeatCount: "indefinite" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("rect", { height: "100%", width: "100%", fill: "url(#Grid)", filter: "url(#Glow)" }),
        /* @__PURE__ */ jsxs("text", { x: "50%", y: "50%", textAnchor: "middle", children: [
          /* @__PURE__ */ jsx("tspan", { x: "50%", dy: "1px", style: { fontSize: "20px" }, children: "ENTER: /LIMEN" }),
          /* @__PURE__ */ jsx("tspan", { x: "50%", dy: "5px", style: { fontSize: "4px" }, children: "clicca sullo schermo o premi un tasto per entrare" })
        ] })
      ]
    }
  ) });
};
const welcomeScreenSound = "/assets/LOOP_ACCESSO-BcIUfAg6.wav";
const selectionSound = "/assets/LOOP_SCHERMATA-CYZb3di7.wav";
const welcomeVideo = "/assets/ENTRATA-DBQlnr5r.mp4";
function meta({}) {
  return [{
    title: "ENTER: /LIMEN"
  }, {
    name: "Enter LIMEN web app",
    content: ""
  }];
}
const AUDIO_FADE_DURATION = 100;
const welcomeScene = {
  id: 0,
  name: "Welcome",
  src: welcomeVideo,
  thumbnail: ""
};
const fadeOut = (audio) => {
  return new Promise((resolve) => {
    let volume = audio.volume;
    const interval = setInterval(() => {
      if (volume > 0) {
        volume = Math.max(0, volume - 0.1);
        audio.volume = volume;
      } else {
        clearInterval(interval);
        audio.pause();
        resolve();
      }
    }, AUDIO_FADE_DURATION / 10);
  });
};
const fadeIn = (audio) => {
  audio.muted = true;
  audio.play().catch((error) => console.error("Errore nel riprodurre l'audio:", error)).then(() => {
    audio.muted = false;
    audio.volume = 1;
  });
};
const home = withComponentProps(function Home() {
  const [selectedScene, setSelectedScene] = useState(null);
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [audio, setAudio] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  useEffect(() => {
    let fadeOutInProgress = false;
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
  const onSceneSelect = (scene) => {
    if (selectedScene) return;
    if (scene.name === "Exit") {
      setIsFadingOut(true);
      setTimeout(() => {
        setWelcomeScreen(true);
        setIsFadingOut(false);
      }, 3e3);
    } else {
      setSelectedScene(scene);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (welcomeScreen) {
        setSelectedScene(welcomeScene);
        setTimeout(() => {
          setWelcomeScreen(false);
        }, 1e3);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleKeyDown);
    };
  }, [welcomeScreen]);
  return /* @__PURE__ */ jsxs("div", {
    className: "Home",
    style: {
      margin: "0px",
      padding: "0px",
      overflow: "hidden",
      height: "100%",
      width: "100%"
    },
    children: [welcomeScreen && /* @__PURE__ */ jsx(Welcome, {}), selectedScene && /* @__PURE__ */ jsx(SceneViewer, {
      scene: selectedScene,
      onBack: () => setSelectedScene(null)
    }), !welcomeScreen && /* @__PURE__ */ jsxs("div", {
      className: styles.maincontainer + (isFadingOut ? " " + styles.fadeOut : ""),
      children: [/* @__PURE__ */ jsx(Background, {}), /* @__PURE__ */ jsx(SceneSelector, {
        onSelect: onSceneSelect
      })]
    }), isFadingOut && /* @__PURE__ */ jsx("div", {
      className: styles.overlay
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BFhZpkrh.js", "imports": ["/assets/chunk-HA7DTUK3-DItZKCSJ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-jat9l4Nc.js", "imports": ["/assets/chunk-HA7DTUK3-DItZKCSJ.js", "/assets/with-props-Db1jVSdq.js"], "css": ["/assets/root-CrK_iDbU.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-R_vyN_ot.js", "imports": ["/assets/with-props-Db1jVSdq.js", "/assets/chunk-HA7DTUK3-DItZKCSJ.js"], "css": ["/assets/home-CLWIJFx0.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-f6e093fc.js", "version": "f6e093fc" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
