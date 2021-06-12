import { createGroup, delGroup } from "@/api/group";

export default {
  methods: {
    //添加组提交
    addGroup(formData) {
      if (formData.pid) {
        if (typeof formData.pid != "number") {
          formData.pid = formData.pid.pop();
        }
        formData.level = formData.pid.length;
      }
      this.$refs.form.validate().then(() => {
        createGroup(formData).then(() => {
          this.getData();
          this.$refs.form.reset();
          this.$notify({ type: "success", message: "添加群组成功" });
        });
      });
    },
    //删除组操作
    deleteGroup(id) {
      delGroup(id).then(this.getData);
    }
  }
};
