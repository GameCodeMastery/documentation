import { Plugin } from "./types"

export const ImageModalPlugin: Plugin = () => ({
  name: "ImageModalPlugin",
  run: async (ctx) => {
    ctx.on("html", (html) => {
      // Add modal JavaScript to the page
      html.addBodyTag({
        tag: "script",
        content: `
          document.addEventListener("DOMContentLoaded", () => {
            const images = document.querySelectorAll('.quartz-content img');
            images.forEach((img) => {
              img.style.cursor = 'pointer';
              img.addEventListener('click', () => {
                const modal = document.createElement("div");
                modal.style.position = "fixed";
                modal.style.top = "0";
                modal.style.left = "0";
                modal.style.width = "100%";
                modal.style.height = "100%";
                modal.style.background = "rgba(0,0,0,0.8)";
                modal.style.display = "flex";
                modal.style.alignItems = "center";
                modal.style.justifyContent = "center";
                modal.style.zIndex = "1000";

                const modalImg = document.createElement("img");
                modalImg.src = img.src;
                modalImg.style.maxWidth = "90%";
                modalImg.style.maxHeight = "90%";

                modal.appendChild(modalImg);
                modal.onclick = () => modal.remove();
                document.body.appendChild(modal);
              });
            });
          });
        `,
      })
      // Add CSS for images
      html.addHeadTag({
        tag: "style",
        content: `
          .quartz-content img {
            max-width: 100%;
            height: auto;
            cursor: pointer;
            transition: transform 0.2s;
          }
          .quartz-content img:hover {
            transform: scale(1.05);
          }
        `,
      })
    })
  },
})