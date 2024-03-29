// Defines a Vue <p5> Component

Vue.component('p5', {

  template: '<div></div>',

  props: ['src','data'],

  methods: {
    // loadScript from https://stackoverflow.com/a/950146
    // loads the p5 javscript code from a file
    loadScript: function (url, callback)
    {
      // Adding the script tag to the head as suggested before
      var head = document.head;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = callback;
      script.onload = callback;

      // Fire the loading
      head.appendChild(script);
    },

    loadSketch: function() {
      this.myp5 = new p5(sketch(this));
    }
  },

  data: function() {
    return {
      myp5: {}
    }
  },

  mounted() {
    this.loadScript(this.src, this.loadSketch);
  },

  watch: {
    data: {
      handler: function(val, oldVal) {
        if(this.myp5.dataChanged) {
          this.myp5.dataChanged(val, oldVal);
        }
      },
      deep: true
    }
  }

})

// Sets up the main Vue instance

var app = new Vue({
  el: '#root',

  computed: {
    temp: function() {
      let sigma = 5.67 * Math.pow(10, -8);
      let t = Math.pow(this.data.ein / sigma, 1/4);

      return Math.round(100 * t)/100;
    }
  },

  methods: {
    ktoc: function(t) {
      return Math.round(100 * (t - 273.15))/100;
    }
  },

  data: {

    // this data object stores variables that we want to share between components
    // this is not a good place to store data that doesn't need to be shared
    data: {
      ein: 0
    }

  }

});
