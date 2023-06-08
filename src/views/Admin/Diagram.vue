<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <div class="diagram-container">
        <div class="mermaid" v-html="diagramCode"></div>
      </div>
    </div>
  </template>
  
  <script>
  import mermaid from 'mermaid';
  
  export default {
    data() {
      return {
        diagramCode: '',
      };
    },
    mounted() {
      this.generateDiagram();
    },
    methods: {
      generateDiagram() {
        // Example diagram code (replace with your own)
        const diagramCode = `
          graph TD;
            A-->B;
            A-->C;
            B-->D;
            C-->D;
        `;
  
        // Generate the diagram
        mermaid.initialize({ startOnLoad: false });
        mermaid.render('diagramContainer', diagramCode, (svgCode) => {
          this.diagramCode = svgCode;
        });
      },
    },
  };
  </script>
  
  <style>
  .diagram-container {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  