// 计数器功能
const counterValue = document.getElementById('counter-value');
const btnDecrease = document.getElementById('btn-decrease');
const btnReset = document.getElementById('btn-reset');
const btnIncrease = document.getElementById('btn-increase');

let count = 0;

function updateCounter() {
    counterValue.textContent = count;
}

btnIncrease.addEventListener('click', () => {
    count++;
    updateCounter();
});

btnDecrease.addEventListener('click', () => {
    count--;
    updateCounter();
});

btnReset.addEventListener('click', () => {
    count = 0;
    updateCounter();
});

// 待办事项功能
const todoInput = document.getElementById('todo-input');
const btnAdd = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    span.addEventListener('click', () => {
        span.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    todoInput.value = '';
    todoInput.focus();
}

btnAdd.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 主题颜色切换
const colorButtons = document.querySelectorAll('.color-btn');

colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        document.body.style.background = `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;

        // 高亮选中按钮
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// 默认高亮第一个颜色
if (colorButtons.length > 0) {
    colorButtons[0].classList.add('active');
}

// 显示当前时间
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('current-time').textContent = timeStr;
}

updateTime();
setInterval(updateTime, 1000);