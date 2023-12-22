<template>
  <a-button
    type="primary"
    size="small"
    class="exportButton"
    @click="exportButton()"
    >导出</a-button
  >
</template>

<script>
import { generateDocxFile } from "../utils/dataToWord";
import saveAs from "file-saver";
export default {
  name: "IndexPage",
  methods: {
    async exportButton() {
      const path = "../template.docx";
      const params = {
        content: {
          title: "会议纪要",
          speakerList: [
            {
              speaker: "用户-1",
              text: "早上好",
            },
            {
              speaker: "用户-2",
              text: "吃饭了么？",
            },
          ],
        },
      };
      let title = "";
      fetch(path)
        .then((response) => response.blob())
        .then(async (blob) => {
          const file = new File([blob], "template.docx");
          const out = await generateDocxFile(file, params);
          saveAs(out, title + ".docx");
        });
    },
  },
};
</script>
