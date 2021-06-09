let currentEffect;
class Dep {
    constructor(val) {
        // this._value = val;
        this.effectArr = new Set()
    }
    // get value() {
    //     this.depend()
    //     return this._value;
    // }
    // set value(val) {
    //     this._value = val;
    //     this.notice();
    // }
    notice() {
        this.effectArr.forEach(effect => {
            effect();
        });
    }
    depend () {
        if(currentEffect) {
            this.effectArr.add(currentEffect)
        }

    }
}
function effectWatch(effect) {
    currentEffect = effect;
    effect()
    currentEffect = null;
}
// b的值依赖于value, 当value发生改变时需要触发注册，执行对应动作
// let dep = new Dep(10)
// let b = 0;
// effectWatch(() => {
//     b = dep.value + 10;
//     console.log(b);
// })
// dep.value = 1;
const targetMap = new Map();
function reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            let depMap = targetMap.get(target);
            if(!depMap) {
                depMap = new Map();
                targetMap.set(target, depMap)
            }
            let dep = depMap.get(key);
            if(!dep){
                dep = new Dep();
                depMap.set(key, dep)
            }
            dep.depend();
            return Reflect.get(target, key)
        },
        set(target, key, val) {
            let depMap = targetMap.get(target);
            if(!depMap) {
                depMap = new Dep();
                targetMap.set(target, depMap);
            }
            let dep = depMap.get(key);
            if(!dep) {
                dep = new Map();
                depMap.set(key, dep)
            }
            let res = Reflect.set(target, key, val);
            dep.notice();
            return res
        }
    })
}
const user = reactive({
    age: 1
})
let double ;
effectWatch(() => {
    console.log("--------reactive------")
    double = user.age;
    console.log(double)
})
user.age = 2;
