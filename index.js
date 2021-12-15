var map= new Map();
const selected =  new Set()
$('#edit-box').hide();
$('#pending').html( map.size +' Pending Tasks');

function AddClicked(){
    var desc=$('#Description').val();
    var date=$('#date').val();
    var category=$('#category').val();

    if(desc && date && category){
        var uniq = 'id' + (new Date()).getTime();
        data={
            id:uniq,
            description:desc,
            dueDate:date,
            category:category,
            isComplete:false
        }
        map.set(uniq,data);
        $('#pending').html( map.size +' Pending Tasks');
        $('#Description').val('');
        loadData();
    }
    else{
        alert("All Fields are mandatory Please fill data correctly")
    }

}
function loadData(){
    $('#ul').empty();
    for (const [key, data] of map.entries()) {
        $('#ul').append(`
        <li class="todo">
            <label>
                <input class="check" type="checkbox" name="id" value="${data.id}" onclick="checkClicked('${data.id}')" >
                <span></span>
            </label>

            <span class="description">
                ${data.description}
            </span>

            <span class="category-${data.category}">
                ${data.category}
            </span>

            <button onClick="editClicked('${data.id}')" id="${data.id}">
                <i class="fas fa-edit"></i>
            </button>

            <span class="dueDate">
                <i class="far fa-calendar-alt"></i>
                ${data.dueDate}
            </span>
        </li>`)
        document.getElementById(data.id).disabled = data.isComplete;
    }
}

function editClicked(id){
    $('#edit-box').show();
}

function checkClicked(id){
    if(selected.has(id)){
        selected.delete(id);
    }else{
        selected.add(id);
    }
}

function removeClicked(){
    if(selected.size==0){
        return;
    }
    for (let item of selected){
        map.delete(item);
    }
}

