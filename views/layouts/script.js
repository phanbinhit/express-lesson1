// var htmlList = document.getElementById('list-card');

// htmlList.addEventListener("click", function(event) {
//     var button = event.target;
//     if (button.className === "fa fa-trash btn-del") {
//         var dataId = button.dataset.id;
//         fetch('/card/delete/' + dataId, {method: 'POST'})
//             .then(function(res) {
//                 if(res.ok) {
//                     console.log("ok");
//                     return;
//                 }
//                 throw new Error('request failed');
//             })
//             .catch(function(err) {
//                 console.log(err);
//             })
//     }
// })

