├── publish/
└── src/
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── shims-vue.d.ts
├── tests/                         // 单元测试目录
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── vite.config.ts                 // Vite 配置文件

└── package.json





```
基于vue2的一个饿了吗项目改造，不考虑业务逻辑单纯的加强vue3语法和ts的使用，
在实际开发过程增强语法理解，对所遇到的问题进行记录，便于日后工作项目中开发更直接上手。
```

## vue3 常用api介绍
- 变量声明
##### ref toRef

```
vue2中变量存放在data函数中，
在vue3中需要页面动态更新的变量，通过vue中的ref，toRef，reactive函数进行声明（本次项目暂时只用到了这三个，应该还有其他的）

声明的动态更新的变量需要在defineComponent函数中的setup钩子函数中 return出去
```
1. ref

```
ref:本质是拷贝，修改数据会更新界面  接受一个参数
import 
  ref,
} from "vue";

let offset = ref<number>(0);


```

2. toRef

```
toRef：本质是引用，修改当前对象的属性值，对象中的属性也会发生变化，不过不会引起界面更新
接受两个参数
第一个参数为对象，第二个参数为当前对象的属性
toRef 会让当前对象的这个属性变成响应式数据

import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: [title],
  
  setup (props) {
    // 创建变量myTitle
    const myTitle = toRef(props, 'title')

    console.log(myTitle.value)
  }
})
```
3. reactive

##### 获取当前页面路径参数


```
1：引入vuerouter4中的方法
import { useRoute } from 'vue-router'
2：在setup中通过useRoute取值

setup() {
    const route = useRoute()

    onMounted(() => {
      const id = route.params.id
    })
  }
```
##### 通过toRaw获取ref定义的数组中的某一项的数据

```
<!--如果直接获取ref定义的数组中的数据 -->
let placelist = ref<string[]>([]);

placelist.value[index] 如果通过这种方式直接获取到的是proxy代理的数据格式
需要通过toRaw 才能获取到数据的值

 let choosePlace: string = toRaw(placelist.value[index]);
```
## vuex使用

## vuerouter4使用


## axios使用

## vite使用