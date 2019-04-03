<template>
  <div>
    <div >
      <!--   <Vueditor  ref="editor" class="editor" :config="config"></Vueditor>-->
      <quill-editor
      v-model="content"
      ref="myQUillEditor"
      :options="editorOption"
      class="eleditor"
      />
    </div>

    <div class="formularioArellenar">
      <div class="titulo">
        <label for="titulo">Title:</label>
        <input name="titulo" v-model="title" type="text" class="tituloInput" placeholder="Title">
      </div>
      <div class="titulo">
        <label for="titulo">Key:</label>
        <input name="titulo" v-model="key" type="text" class="tituloInput" placeholder="Key">
      </div>
      <div class="fecha">
        <v-date-picker v-model="date"></v-date-picker>
      </div>
      <div class="imagen">
        <picture-input
          ref="pictureInput"
          @change="onChange"
          width="300"
          height="300"
          margin="16"
          accept="image/jpeg, image/png, image/jpg"
          size="10"
          buttonClass="btn"
          :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a 😺 GIF or GTFO'
      }"
        ></picture-input>
      </div>
      <v-btn v-on:click="sendData()" class="boton" color="green">Send</v-btn>
      <v-btn v-on:click="tryData()" class="boton" color="green">Test</v-btn>
    </div>
  </div>
</template>

<script>

import "quill/dist/quill.snow.css"
import PictureInput from "vue-picture-input";
import { quillEditor } from "vue-quill-editor";
import axios from "axios";
import Quill from 'quill'


var Image = Quill.import('formats/image');
Image.className = 'img-fluid';
Quill.register(Image, true);

export default {
  data() {
    return {
      content: "",
      title: "",
      date: "",
      key: "",
      config: {
        toolbar: [
          "removeFormat",
          "undo",
          "|",
          "elements",
          "fontName",
          "fontSize",
          "foreColor",
          "backColor",
          "divider",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "links",
          "divider",
          "subscript",
          "superscript",
          "divider",
          "justifyLeft",
          "justifyCenter",
          "justifyRight",
          "justifyFull",
          "|",
          "indent",
          "outdent",
          "insertOrderedList",
          "insertUnorderedList",
          "|",
          "emoji",
          "picture",
          "tables",
          "|",
          "switchView"
        ]
      },
      editorOption:{
        placeholder: "Type your post...",
        readOnly: true,
        theme: "snow"
      }
    };
  },
  methods: {
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    sendData() {
      let articulo = new Object();
      articulo.titulo = this.title;
      articulo.contenido = this.content
      articulo.fecha = this.date;
      articulo.fecha = this.date;
      articulo.imagen = this.image;
      articulo.key = this.key;
      console.log(articulo.fecha);
      axios
        .post(
          `https://tangerine-coder.firebaseio.com/articulos/${this.key}.json`,
          articulo
        )
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    tryData() {
      let articulo = new Object();
      articulo.titulo = this.title;
      articulo.contenido = this.content
      articulo.fecha = this.date;
      articulo.fecha = this.date;
      articulo.imagen = this.image;
      articulo.key = this.key;
      console.log(articulo.fecha);

      this.$store.commit("changeBibliotecaTest", articulo);
      this.$store.commit("changeArticulo", articulo.key);
      this.$router.push("/test");
    }
  },
  components: {
    PictureInput,
    quillEditor,
    ImageResize:{},
  }
};
</script>

<style scoped>
.formularioArellenar {
  text-align: center;
  display: grid;
  grid-gap: 2rem;
  margin-top: 5rem;
  margin-bottom: 10rem;
}

.tituloInput {
  padding: 1rem 3rem;
  background-color: white;
  border-radius: 20px;
  border: black 1px solid;
}

input:focus {
  outline: none;
}

.datedate {
  padding: 1rem 3rem;
  background-color: white;
  border-radius: 20px;
  border: black 1px solid;
}

.boton {
  width: 30vw;
  justify-self: center;
}

.eleditor {
  height: 80vh;
  overflow: auto;
}
</style>
