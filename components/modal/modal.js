Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    position: {
      type: String, // 'top| center | bottom'
      value: 'center'
    }
  },
  data: {},
  /**
   * 组件的方法列表
   */
  lifetimes: {},
  methods: {
    stopCatch() {
      return;
    },
    maskTap() {
      this.triggerEvent('maskTap');
    }
  }
});
