import { ref, computed } from "vue"
import { useStorage } from '../utils/storage'

export function useTodos() {

    let title = ref("")
    let todos = useStorage("todos", [{ title: "测试数据", done: false }])
    let isnull = ref(false)
    function addTodo() {
        if (!title.value) {
            isnull.value = true
            setTimeout(() => {
                isnull.value = false
            }, 2000)
            return
        }
        todos.value.push({ title: title.value, done: false })
        title.value = ""
    }

    function clear() {
        todos.value = todos.value.filter((v) => !v.done)
    }

    let active = computed(() => {
        return todos.value.filter((v) => !v.done).length
    })

    let all = computed(() => todos.value.length)

    let allDone = computed({
        get: function () {
            return active.value === 0
        },
        set: function (value) {
            todos.value.forEach((todo) => {
                todo.done = value
            })
        },
    })
    return { title, todos, addTodo, clear, active, all, allDone,isnull }
}