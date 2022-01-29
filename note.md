## style样式的特性
* 1、在 style 标签上，当我们加上 scoped 这个属性的时候，我们定义的 CSS 就只会应用到当前组件的元素上，这样就很好地避免了一些样式冲突的问题。
* 2、如果在 scoped 内部，你还想写全局的样式，那么你可以用:global 来标记，这样能确保你可以很灵活地组合你的样式代码；
* 3、我们甚至可以通过 v-bind 函数，直接在 CSS 中使用 JavaScript 中的变量。
```javascript
<script setup>
import { ref } from "vue";
let color = 'red'
</script>

<style>
h1 {  
    color:v-bind(color);
}
</style>
```

## 组件的v-model
在自定义组件上我们也可以用 v-model，对于自定义组件来说，v-model 是传递属性和接收组件事件两个写法的简写。
```javascript
let props = defineProps({
    modelValue: Number,
})
let emits = defineEmits(['update:modelValue'])
emits('update:modelValue',"具体值")
```
然后我们就可以按如下代码中的方式，使用 MyComponent 这个组件，也就是直接使用 v-model 绑定 num 变量。
```javascript
<MyComponent v-model="num"></Rate>
```


## Proxy
* reactive 就是基于 Proxy 实现的，Proxy 是针对对象来监听，而不是针对某个具体属性，所以不仅可以代理那些定义时不存在的属性，还可以代理更丰富的数据结构，比如 Map、Set 等，并且我们也能通deleteProperty 实现对删除操作的代理。
兼容不了IE11
```javascript
let obj = {};
let proxy = new Proxy(obj, {
  get: function (target, prop) {
    return target[prop];
  },
  set: function (target, prop, value) {
    target[prop] = value;
    //其他处理逻辑
  },
  deleteProperty(target, prop) {
    delete target[prop];
    //其他处理逻辑
  },
});
```
* Vue 3 中还有另一个响应式实现的逻辑，就是利用对象的 get 和 set 函数来进行监听，这种响应式的实现方式，只能拦截某一个属性的修改，这也是 Vue 3 中 ref 这个 API 的实现。
```javascript
let _value =1;
let count={
    get value(){
        return _value
    },
    set value(value){
        _value =value;
    }
}
```



## TypeScript 入门

#### 定义数据类型的变量
```
let myname:string="l4g";
let age:number=32;
let hobby:undefined;
```

#### 当你不确定某个变量是什么类型时，你可以使用 any 作为这个变量的类型
```
let temp:any="test";
temp = false;
temp = 1234;
```
#### 枚举 可以把类型限制在指定的场景之内
```
enum course {good,veryGood,ggGood}
console.log(course.good === 0,course[0] === 'good')
```

#### 组合类型 组合的方式组合出新的类型
```
let course1:string|number ="VUE3"
type courseScore = 'good' | 'veryGood' | 'ggGood'
let score1: courseScore = 'good'
score1 = 'veryGood11'  //报错

//interface 接口可以定义对象的类型限制
interface course3 {
    name:string,
    price:number,
    img?:string | boolean,
    readonly address:string
}
let vueCourse:course3 = {
    name:'vue3',
    price:55,
    address:'北京市******'
}
vueCourse.address = "湖南省******"  //报错
```

#### 函数的类型限制
```
function add(x:number,y:number):number {
    return x+y;
}
type addType = (a:number,b:number)=>number;
let add2:addType = function(x:number,y:number):number{
    return x+y;
}
interface addType1 {
    (a:number,b:number):number
}
let add3:addType1 = function(x:number,y:number):number{
    return x+y
}
```

#### 很多浏览器的变量和属性，怎么限制类型
```
let w:Window = window;
let ele:HTMLElement = document.createElement("span")
let allSpan:NodeList = document.querySelectorAll('span')
ele.addEventListener('click',function(e:MouseEvent){
    const args:IArguments = arguments;
})
```

#### 泛型
```
function getInfo<T>(arg:T):T{
    return arg;
}
getInfo<string>("vue3")
getInfo<number>(1)


//使用keyof语法获得已知类型的属性列表，相当于 ‘name’|‘price’
interface couser4 {
    name:string,
    price:number
}
type CourseProps = keyof couser4 // 只能是name和price选一个
let k:CourseProps = 'name'  //值可以是name或price

function getProperty<T,K extends keyof T>(o:T,name:K):T[K]{
    return o[name]
}
const coursePrice={
    'vue':55,
    'go':69
}
getProperty(coursePrice,"vue")
getProperty(coursePrice,"node")  //报错
```

#### 关键字infer，
* <T> 让我们拥有了给函数的参数定义类型变量的能力，infer 则是可以在 extends 之后的变量设置类型变量，更加细致地控制类型。下面的代码中我们定义了 ReturnType 类型函数，目的是返回传入函数的返回值类型。infer P 的意思就是泛型 T 是函数类型，并且这个函数类型的返回类型是 P。
```
type Foo = () => CourseProps
// 如果T是一个函数，并且函数返回类型是P就返回P
type ReturnType1<T> = T extends ()=>infer P ?P:never 
type Foo1 = ReturnType1<Foo>
```



