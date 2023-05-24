  <script>
function loading(){
   $.LoadingOverlay("show", {
       image       : "",
       fontawesomeAnimation:'1500ms',
       fontawesomeResizeFactor: '0.5',
       fontawesome : "fa fa-cog fa-spin"
       });
}
let pform = document.getElementById('pform')
let ptable = document.getElementById('ptable')
let fullname =document.getElementById('fullname');

let userName
window.addEventListener('load',function(){
 userName = sessionStorage.getItem('userName');
 console.log('userName: ',userName)
 if(userName === null || userName ===""){
      userName =""
 }else{
   loading()
    setTimeout(function(){
      $.LoadingOverlay("hide");
      pform.style.display="none"
      ptable.style.display="block"
      fullname.innerHTML = "<span><i class='fa-regular fa-user'></i>  "+userName+"</span>";
      }, 1000);
 }
})

  function login(obj){
    event.preventDefault()
    loading()
    google.script.run.withSuccessHandler(loginsuccess).checklogin(obj)
  }

  function loginsuccess(data){
    if(data && data !== undefined && data.length != 0){
      let user = data[2]
      sessionStorage.setItem('userName',user);   
      setTimeout(function(){
       $.LoadingOverlay("hide");
      pform.style.display="none"
      ptable.style.display="block"
      document.getElementById('myForm').reset()
      fullname.innerHTML = "<span><i class='fa-regular fa-user'></i>  "+user+"</span>";
      google.script.run.withSuccessHandler(showTable).getData()
     Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Login successfully',
        showConfirmButton: false,
        timer: 1500
      })
     }, 1000);
    }else{
      setTimeout(function(){
       $.LoadingOverlay("hide");
       Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Data not found',
        showConfirmButton: false,
        timer: 1500
      })
     }, 1000);
    }
  }

  function logout(){
      loading()
    setTimeout(function(){
      $.LoadingOverlay("hide");
      pform.style.display="block"
      ptable.style.display="none"
      sessionStorage.removeItem('userName');
       }, 1000);
      }

google.script.run.withSuccessHandler(showTable).getData()
function showTable(dataArray){
  $('#data-table').DataTable({
    data:dataArray.slice(1),
    lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "all"]],
    order: false,
    destroy:true,
   
    columns: [
      { title: "ID" },
      { title: "Name" },
      { title: "Gender" },
      { title: "Date of Birth" },
      { title: "Email" },
      { title: "Phone" },
      { title: "Country" },
      ],
   });
}
  </script>