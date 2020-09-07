import React from "react";
import YouTube from "react-youtube";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import * as P from "ts-prime";
function getYouTubeVideoId(url: string) {
  try {
    return new URL(url).searchParams.get("v");
  } catch {
    return;
  }
}
export function YouTubeView(props: {
  url: string;
  play: BehaviorSubject<boolean>;
}) {
  const id = getYouTubeVideoId(props.url);
  if (!id) return null;
  const opts = {
    width: "100%",
    height: "100%"
  };
  return (
    <div className={"ResponsiveYouTube"}>
      <YouTube
        onPlay={() => {
          props.play.next(true);
        }}
        onReady={(e) => {
          props.play.pipe(filter((c) => !c)).subscribe(() => {
            e.target.pauseVideo();
          });
        }}
        videoId={id}
        opts={opts}
      ></YouTube>
    </div>
  );
}
