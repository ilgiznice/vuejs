const app = new Vue({
  el: '#app',
  data: {
    firstName: '',
    lastName: '',
    firstNamePlaceholder: 'Введите ваше имя',
    lastNamePlaceholder: 'Введите вашу фамилию',
  },
  computed: {
    fullName: function () {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  methods: {
    alert() {
      alert(this.fullName);
    }
  }
});

const todos = new Vue({
  el: '#todos',
  data: {
    todos: [],
    todo: '',
  },
  computed: {
    unfinishedTodos() {
      return this.todos.filter(function (todo) {
        return todo.status === -1;
      });
      // const todos = [];
      // for (let i = 0; i < this.todos.length; i++) {
      //   if (this.todos[i].status === -1) {
      //     todos.push(this.todos[i]);
      //   }
      // }
    },
    finishedTodos() {
      return this.todos.filter(function (todo) {
        return todo.status === 1;
      });
    }
  },
  methods: {
    addTodo() {
      this.todos.push({
        text: this.todo,
        status: -1
      });
    },
    finishTodo(todo) {
      this.todos = this.todos.map(function (_todo) {
        if (_todo.text === todo.text) {
          _todo.status = 1;
        }
        return _todo;
      });
    }
  }
});

const weather = new Vue({
  el: '#weather',
  data: {
    city: null,
    cities: [
      {
        id: 523750,
        name: 'Набережные Челны'
      },
      {
        id: 551487,
        name: 'Казань'
      }
    ]
  },
  computed: {
    info() {
      if (!this.city) return null
      return {
        name: this.city.name,
        temp: this.city.main.temp,
        wind: this.city.wind.speed,
        pressure: this.city.main.pressure,
        icon: `http://openweathermap.org/img/w/${this.city.weather[0].icon}.png`
      };
    }
  },
  methods: {
    show(id) {
      const appId = 'addd9b7c638d19282e10c7590c0147e9';
      const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${appId}&units=metric`;
      this.$http
        .get(url)
        .then(function (response) {
          console.log(response);
          this.city = response.body;
        });
    }
  }
})
