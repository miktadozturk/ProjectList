//Data Stuff



const projectFactory  = (name, desc) => {
    let todoArray = [];
    let displayClass = "built";
    const addTodo = (todoItem) => todoArray.push(todoItem);
    const removeTodo = (index) => todoArray.splice(index, 1);
    return {name,desc,addTodo,removeTodo,todoArray};
};

const todoFactory = (name, desc, due, priority, isComplete) => {
    const toggleIsComplete = () => {
        isComplete = !isComplete;
    };
    return {name,desc,due,priority,toggleIsComplete,isComplete};
};

const inputValidationOnSubmit = (selector) => {
    $(selector + ' input').each(function() {
        if ($(this).val() == '') {
            $(this).addClass('highlight');
        }
        else{
            $(this).removeClass('highlight');
        }
    });
    if ($(selector + ' input').hasClass('highlight')) {
        $(".message").text("Please fill in the required fields.");
        $(".messageBox").show();
        $(".yes").hide();
        $(".no").hide();
        return false;
    }
    else {
        return true;
    }
};
const clearInputOnSubmit = (selector) => {
    $(selector + ' .main').each(function() {
        $(this).val('');
    });
};

//DOM Stuff

const renderProjects = (array) => {
    let html = '';
    for (let i=0 ; i<array.length ; i++) {
        if (projectArray[i].displayClass == undefined){
            projectArray[i].displayClass = "built";
            console.log(projectArray[i].displayClass);
        }
        html += `
    <div class="project ${projectArray[i].displayClass}" data-projectId="${i}">
      <h2>${projectArray[i].name}</h2>
      <h3>${projectArray[i].desc}</h3>

      <button class="hideProject">Hide Project</button>
      <button class="showProject">Show Project</button>
      <form class="addNewTodo" id="addNewTodo${i}" data-projectId="${i}">
        <fieldset>
        <label>Project Name:</label>
        <input class="main" type="text" id="todoName${i}"></input>
        </fieldset>
        <fieldset>
        <label>Description:</label>
        <input class="main" type="text" id="todoDesc${i}"></input>
        </fieldset>
        <fieldset>
        <label>Due Date:</label>
        <input class="main" type="Date" id="todoDueDate${i}"></input>
        </fieldset>
        <fieldset>
        <label>Priority:</label>
        <section>
          <input type="radio" id="p1" name="priority${i}" checked = "checked" value="1" />
          <label class="radio" for="p1">Low</label>
          <input type="radio" id="p2" name="priority${i}" value="2" />
          <label class="radio" for="p2">Medium</label>
          <input type="radio" id="p3" name="priority${i}" value="3" />
          <label class="radio" for="p2">High</label>
          </section>
        </fieldset>
        <input id="submitTodo${i}" type="submit" value="Add Item"></input>
      </form>
      <ul id="todoList${i}" data-projectId=${i}>
      </ul>
      <button class="removeProject">Delete Project</button>
    </div>`;
    }
    document.querySelector("#projectList").innerHTML = html;
};

const renderTodos = (array, projectId) => {
    let html = '';
    for (let i=0 ; i<array.length ; i++) {
        let completeClass =  "inComplete";
        if (array[i].isComplete){
            completeClass = "complete";
        }
        html += `
    <div class="todo priority${array[i].priority} ${completeClass}">
      <h3>${array[i].name}</h3>
      <p>${array[i].desc}</p>
      <p>${array[i].due}</p>
      <button class="toggle" data-projectId = ${projectId} data-taskId = ${i}>Complete</button>
      <button class="remove" data-projectId = ${projectId} data-taskId = ${i}>Delete</button>
    </div>
    `;
    }
    document.querySelector("#todoList" + projectId).innerHTML = html;
};

//ON LOAD

let projectArray = JSON.parse(localStorage.getItem("projectArray") || '[]');
console.log(projectArray);

if (projectArray[0] === undefined){
    projectArray.push(projectFactory("My Project","List of The Projects"));
}

renderProjects(projectArray);
for (currentId = 0 ; currentId < projectArray.length ; currentId++){
    renderTodos(projectArray[currentId].todoArray , currentId);
}

$(".messageBox").hide();
//LISTENERS

document.querySelector("#addNewProject").addEventListener('submit', function(e) {
    e.preventDefault();
    if(inputValidationOnSubmit('#addNewProject')){
        $(".messageBox").hide();
        let projectName = document.querySelector("#projectName").value;
        let projectDesc = document.querySelector("#projectDesc").value;
        projectArray.push(projectFactory(projectName,projectDesc));
        localStorage.setItem("projectArray", JSON.stringify(projectArray));
        renderProjects(projectArray);
        for (currentId = 0 ; currentId < projectArray.length ; currentId++){
            renderTodos(projectArray[currentId].todoArray , currentId);
        }
        clearInputOnSubmit("#addNewProject");
    }
});

$(document).on('submit', '.addNewTodo', function(e) {
    e.preventDefault();
    let currentId = $(this).attr('data-projectId');
    console.log(currentId);
    if(inputValidationOnSubmit("#addNewTodo" + currentId)){
        $(".messageBox").hide();
        let todoName = document.querySelector("#todoName" + currentId).value;
        let todoDesc = document.querySelector("#todoDesc" + currentId).value;
        let todoDueDate = document.querySelector("#todoDueDate" + currentId).value;
        let todoPriority = $('input[name="priority' + currentId + '"]:checked').val();
        todoPriority = Number(todoPriority);
        console.log(todoPriority);
        let newtodoItem = todoFactory(todoName,todoDesc,todoDueDate,todoPriority, false);
        projectArray[currentId].todoArray.push(newtodoItem);
        console.log(projectArray);
        localStorage.setItem("projectArray", JSON.stringify(projectArray));
        renderTodos(projectArray[currentId].todoArray , currentId);
        clearInputOnSubmit('#addNewTodo' + currentId);
    }
});

$(document).on('click', '.toggle', function() {
    $(this).parent().toggleClass("complete");
    let project = $(this).attr("data-projectId");
    let task = $(this).attr("data-taskId");
    //This should work via a method created in the TodoFactory but for some reason it doesn't.
    projectArray[project].todoArray[task].isComplete = !projectArray[project].todoArray[task].isComplete;
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
    console.log(projectArray[project].todoArray[task].isComplete);
});

$(document).on('click', '.remove', function() {
    let project = $(this).attr("data-projectId");
    let task = $(this).attr("data-taskId");
    //This should work via a method created in the TodoFactory but for some reason it doesn't.
    projectArray[project].todoArray.splice(task,1);
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
    console.log(projectArray[project].todoArray);
    renderTodos(projectArray[project].todoArray , project);
});

//Message box listeners

let selectedProjectId = undefined;

$(document).on('click', '.removeProject', function() {
    selectedProjectId = $(this).parent().attr("data-projectId");
    console.log(selectedProjectId);
    $(".message").text("Are you sure you want to delete this project?");
    $(".messageBox").show();
    $(".yes").show();
    $(".no").show();
    $(".confirm").hide();
});

$(document).on('click', '.yes', function() {
    projectArray.splice(selectedProjectId,1);
    renderProjects(projectArray);
    for (currentId = 0 ; currentId < projectArray.length ; currentId++){
        renderTodos(projectArray[currentId].todoArray , currentId);
    }
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
    $(".messageBox").hide();
    $(".confirm").show();
});

$(document).on('click', ".no", function() {
    $(".messageBox").hide();
    $(".confirm").show();
});

$(document).on("click", ".confirm", function() {
    $(".messageBox").hide();
});

$(document).on("click", ".hideProject", function() {
    $(this).parent().removeClass("built");
    $(this).parent().addClass('collapsed');
    let currentId = $(this).parent().attr("data-projectId");
    console.log(currentId);
    projectArray[currentId].displayClass = "collapsed";
    console.log(projectArray[currentId].displayClass);
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
    $(this).parent().find(".showProject").show();
    $(this).hide();
});

$(document).on("click", ".showProject", function() {
    $(this).parent().removeClass("collapsed");
    $(this).parent().addClass("built");
    let currentId = $(this).parent().attr("data-projectId");
    projectArray[currentId].displayClass = "built";
    console.log(projectArray[currentId].displayClass);
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
    $(this).parent().find(".hideProject").show();
    $(this).hide();
});
