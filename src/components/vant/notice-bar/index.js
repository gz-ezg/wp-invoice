'use strict';

var _component = require('./../common/component.js');

var FONT_COLOR = '#ed6a0c';
var BG_COLOR = '#fffbe8';
(0, _component.VantComponent)({
  props: {
    text: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: 'navigate'
    },
    delay: {
      type: Number,
      value: 0
    },
    speed: {
      type: Number,
      value: 50
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    leftIcon: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    }
  },
  data: {
    show: true,
    hasRightIcon: false,
    width: undefined,
    wrapWidth: undefined,
    elapse: undefined,
    animation: null,
    resetAnimation: null,
    timer: null
  },
  watch: {
    text: function text() {
      this.setData({}, this.init);
    }
  },
  created: function created() {
    if (this.data.mode) {
      this.setData({
        hasRightIcon: true
      });
    }
  },
  destroyed: function destroyed() {
    var timer = this.data.timer;
    timer && clearTimeout(timer);
  },
  methods: {
    init: function init() {
      var _this = this;

      this.getRect('.van-notice-bar__content').then(function (rect) {
        if (!rect || !rect.width) {
          return;
        }

        _this.setData({
          width: rect.width
        });

        _this.getRect('.van-notice-bar__content-wrap').then(function (rect) {
          if (!rect || !rect.width) {
            return;
          }

          var wrapWidth = rect.width;
          var _this$data = _this.data,
              width = _this$data.width,
              speed = _this$data.speed,
              scrollable = _this$data.scrollable,
              delay = _this$data.delay;

          if (scrollable && wrapWidth < width) {
            var elapse = width / speed * 1000;
            var animation = wx.createAnimation({
              duration: elapse,
              timeingFunction: 'linear',
              delay: delay
            });
            var resetAnimation = wx.createAnimation({
              duration: 0,
              timeingFunction: 'linear'
            });

            _this.setData({
              elapse: elapse,
              wrapWidth: wrapWidth,
              animation: animation,
              resetAnimation: resetAnimation
            }, function () {
              _this.scroll();
            });
          }
        });
      });
    },
    scroll: function scroll() {
      var _this2 = this;

      var _this$data2 = this.data,
          animation = _this$data2.animation,
          resetAnimation = _this$data2.resetAnimation,
          wrapWidth = _this$data2.wrapWidth,
          elapse = _this$data2.elapse,
          speed = _this$data2.speed;
      resetAnimation.translateX(wrapWidth).step();
      var animationData = animation.translateX(-(elapse * speed) / 1000).step();
      this.setData({
        animationData: resetAnimation.export()
      });
      setTimeout(function () {
        _this2.setData({
          animationData: animationData.export()
        });
      }, 100);
      var timer = setTimeout(function () {
        _this2.scroll();
      }, elapse);
      this.setData({
        timer: timer
      });
    },
    onClickIcon: function onClickIcon() {
      var timer = this.data.timer;
      timer && clearTimeout(timer);
      this.setData({
        show: false,
        timer: null
      });
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkZPTlRfQ09MT1IiLCJCR19DT0xPUiIsInByb3BzIiwidGV4dCIsInR5cGUiLCJTdHJpbmciLCJ2YWx1ZSIsIm1vZGUiLCJ1cmwiLCJvcGVuVHlwZSIsImRlbGF5IiwiTnVtYmVyIiwic3BlZWQiLCJzY3JvbGxhYmxlIiwiQm9vbGVhbiIsImxlZnRJY29uIiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwic2hvdyIsImhhc1JpZ2h0SWNvbiIsIndpZHRoIiwidW5kZWZpbmVkIiwid3JhcFdpZHRoIiwiZWxhcHNlIiwiYW5pbWF0aW9uIiwicmVzZXRBbmltYXRpb24iLCJ0aW1lciIsIndhdGNoIiwic2V0RGF0YSIsImluaXQiLCJjcmVhdGVkIiwiZGVzdHJveWVkIiwiY2xlYXJUaW1lb3V0IiwibWV0aG9kcyIsIl90aGlzIiwiZ2V0UmVjdCIsInRoZW4iLCJyZWN0IiwiX3RoaXMkZGF0YSIsInd4IiwiY3JlYXRlQW5pbWF0aW9uIiwiZHVyYXRpb24iLCJ0aW1laW5nRnVuY3Rpb24iLCJzY3JvbGwiLCJfdGhpczIiLCJfdGhpcyRkYXRhMiIsInRyYW5zbGF0ZVgiLCJzdGVwIiwiYW5pbWF0aW9uRGF0YSIsImV4cG9ydCIsInNldFRpbWVvdXQiLCJvbkNsaWNrSWNvbiIsIm9uQ2xpY2siLCJldmVudCIsIiRlbWl0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLElBQUlBLGFBQWEsU0FBakI7QUFDQSxJQUFJQyxXQUFXLFNBQWY7QUFDQSw4QkFBYztBQUNaQyxTQUFPO0FBQ0xDLFVBQU07QUFDSkMsWUFBTUMsTUFERjtBQUVKQyxhQUFPO0FBRkgsS0FERDtBQUtMQyxVQUFNO0FBQ0pILFlBQU1DLE1BREY7QUFFSkMsYUFBTztBQUZILEtBTEQ7QUFTTEUsU0FBSztBQUNISixZQUFNQyxNQURIO0FBRUhDLGFBQU87QUFGSixLQVRBO0FBYUxHLGNBQVU7QUFDUkwsWUFBTUMsTUFERTtBQUVSQyxhQUFPO0FBRkMs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L0IsV0FBS0MsS0FBTCxDQUFXLE9BQVgsRUFBb0JELEtBQXBCO0FBQ0Q7QUFyRk07QUFyRUcsQ0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vY29tcG9uZW50JztcbnZhciBGT05UX0NPTE9SID0gJyNlZDZhMGMnO1xudmFyIEJHX0NPTE9SID0gJyNmZmZiZTgnO1xuVmFudENvbXBvbmVudCh7XG4gIHByb3BzOiB7XG4gICAgdGV4dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSxcbiAgICBtb2RlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJydcbiAgICB9LFxuICAgIHVybDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSxcbiAgICBvcGVuVHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICduYXZpZ2F0ZSdcbiAgICB9LFxuICAgIGRlbGF5OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICB2YWx1ZTogMFxuICAgIH0sXG4gICAgc3BlZWQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiA1MFxuICAgIH0sXG4gICAgc2Nyb2xsYWJsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiB0cnVlXG4gICAgfSxcbiAgICBsZWZ0SWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSxcbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6IEZPTlRfQ09MT1JcbiAgICB9LFxuICAgIGJhY2tncm91bmRDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6IEJHX0NPTE9SXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgc2hvdzogdHJ1ZSxcbiAgICBoYXNSaWdodEljb246IGZhbHNlLFxuICAgIHdpZHRoOiB1bmRlZmluZWQsXG4gICAgd3JhcFdpZHRoOiB1bmRlZmluZWQsXG4gICAgZWxhcHNlOiB1bmRlZmluZWQsXG4gICAgYW5pbWF0aW9uOiBudWxsLFxuICAgIHJlc2V0QW5pbWF0aW9uOiBudWxsLFxuICAgIHRpbWVyOiBudWxsXG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdGV4dDogZnVuY3Rpb24gdGV4dCgpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7fSwgdGhpcy5pbml0KTtcbiAgICB9XG4gIH0sXG4gIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQoKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5tb2RlKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBoYXNSaWdodEljb246IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgZGVzdHJveWVkOiBmdW5jdGlvbiBkZXN0cm95ZWQoKSB7XG4gICAgdmFyIHRpbWVyID0gdGhpcy5kYXRhLnRpbWVyO1xuICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdGhpcy5nZXRSZWN0KCcudmFuLW5vdGljZS1iYXJfX2NvbnRlbnQnKS50aGVuKGZ1bmN0aW9uIChyZWN0KSB7XG4gICAgICAgIGlmICghcmVjdCB8fCAhcmVjdC53aWR0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLnNldERhdGEoe1xuICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoXG4gICAgICAgIH0pO1xuXG4gICAgICAgIF90aGlzLmdldFJlY3QoJy52YW4tbm90aWNlLWJhcl9fY29udGVudC13cmFwJykudGhlbihmdW5jdGlvbiAocmVjdCkge1xuICAgICAgICAgIGlmICghcmVjdCB8fCAhcmVjdC53aWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciB3cmFwV2lkdGggPSByZWN0LndpZHRoO1xuICAgICAgICAgIHZhciBfdGhpcyRkYXRhID0gX3RoaXMuZGF0YSxcbiAgICAgICAgICAgICAgd2lkdGggPSBfdGhpcyRkYXRhLndpZHRoLFxuICAgICAgICAgICAgICBzcGVlZCA9IF90aGlzJGRhdGEuc3BlZWQsXG4gICAgICAgICAgICAgIHNjcm9sbGFibGUgPSBfdGhpcyRkYXRhLnNjcm9sbGFibGUsXG4gICAgICAgICAgICAgIGRlbGF5ID0gX3RoaXMkZGF0YS5kZWxheTtcblxuICAgICAgICAgIGlmIChzY3JvbGxhYmxlICYmIHdyYXBXaWR0aCA8IHdpZHRoKSB7XG4gICAgICAgICAgICB2YXIgZWxhcHNlID0gd2lkdGggLyBzcGVlZCAqIDEwMDA7XG4gICAgICAgICAgICB2YXIgYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGVsYXBzZSxcbiAgICAgICAgICAgICAgdGltZWluZ0Z1bmN0aW9uOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgZGVsYXk6IGRlbGF5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciByZXNldEFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICB0aW1laW5nRnVuY3Rpb246ICdsaW5lYXInXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIGVsYXBzZTogZWxhcHNlLFxuICAgICAgICAgICAgICB3cmFwV2lkdGg6IHdyYXBXaWR0aCxcbiAgICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICAgIHJlc2V0QW5pbWF0aW9uOiByZXNldEFuaW1hdGlvblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBfdGhpcy5zY3JvbGwoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHNjcm9sbDogZnVuY3Rpb24gc2Nyb2xsKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBfdGhpcyRkYXRhMiA9IHRoaXMuZGF0YSxcbiAgICAgICAgICBhbmltYXRpb24gPSBfdGhpcyRkYXRhMi5hbmltYXRpb24sXG4gICAgICAgICAgcmVzZXRBbmltYXRpb24gPSBfdGhpcyRkYXRhMi5yZXNldEFuaW1hdGlvbixcbiAgICAgICAgICB3cmFwV2lkdGggPSBfdGhpcyRkYXRhMi53cmFwV2lkdGgsXG4gICAgICAgICAgZWxhcHNlID0gX3RoaXMkZGF0YTIuZWxhcHNlLFxuICAgICAgICAgIHNwZWVkID0gX3RoaXMkZGF0YTIuc3BlZWQ7XG4gICAgICByZXNldEFuaW1hdGlvbi50cmFuc2xhdGVYKHdyYXBXaWR0aCkuc3RlcCgpO1xuICAgICAgdmFyIGFuaW1hdGlvbkRhdGEgPSBhbmltYXRpb24udHJhbnNsYXRlWCgtKGVsYXBzZSAqIHNwZWVkKSAvIDEwMDApLnN0ZXAoKTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGFuaW1hdGlvbkRhdGE6IHJlc2V0QW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICB9KTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIuc2V0RGF0YSh7XG4gICAgICAgICAgYW5pbWF0aW9uRGF0YTogYW5pbWF0aW9uRGF0YS5leHBvcnQoKVxuICAgICAgICB9KTtcbiAgICAgIH0sIDEwMCk7XG4gICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLnNjcm9sbCgpO1xuICAgICAgfSwgZWxhcHNlKTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHRpbWVyOiB0aW1lclxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbkNsaWNrSWNvbjogZnVuY3Rpb24gb25DbGlja0ljb24oKSB7XG4gICAgICB2YXIgdGltZXIgPSB0aGlzLmRhdGEudGltZXI7XG4gICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgIHRpbWVyOiBudWxsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgZXZlbnQpO1xuICAgIH1cbiAgfVxufSk7Il19