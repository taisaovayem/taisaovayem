"use client";
import Script from "next/script";

export function FacebookComment() {
  return (
    <>
      <article>
        <div
          className="fb-comments"
          data-href="https://taisaovayem.com"
          data-width=""
          data-numposts="10"
        ></div>
      </article>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src={`https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v21.0&appId=${process.env.FACEBOOK_APP_ID}`}
      ></Script>
    </>
  );
}

export default FacebookComment;
