const colors = {
   white: "#fff",
   primary: {
      default: "rgba(223, 47, 94, 1)",
      faded: "rgba(223, 47, 94, 0.35)",
      extraFaded: "rgba(223, 47, 94, 0.10)"
   },
   accent: {
      default: "rgba(0, 125, 255, 1)"
   },
   grey: {
      extraLight: "#fafafa",
      light: "#ededed",
      medium: "#cccccc"
   },
   text: {
      primary: "rgba(32, 32, 32, 1)"
   },
   _colors: [
      "rgb(255, 205, 210)",
      "rgb(218, 247, 166)",
      "rgb(255, 195, 0)",
      "rgb(255, 87, 51)",
      "rgb(199, 0, 57)",
      "rgb(144, 12, 63)",
      "rgb(27, 94, 32)",
      "rgb(100, 255, 218)",
      "rgb(132, 255, 255)",
      "rgb(2, 136, 209)",
      "rgb(100, 181, 246)",
      "rgb(48, 63, 159)",
      "rgb(230, 74, 25)",
      "rgb(255, 87, 34)",
      "rgb(255, 214, 0)",
      "rgb(251, 192, 45)"
   ],
   randomColor() {
      const i = Math.floor(Math.random() * this._colors.length);
      return this._colors[i];
   }
};

export default colors;
