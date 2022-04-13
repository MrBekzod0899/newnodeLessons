let menuCategory=document.getElementById('headNav')
let footerCategory=document.getElementById('footerCategory')
let sideCategory=document.getElementById('sideCategory')

fetch('/category/all')
.then(res=>res.json())
.then(data=>{
    if(data.menuCategory){
        data.menuCategory.forEach(item=>{
            menuCategory.innerHTML+=`<li><a href="/show">${item.title}</a></li>`
        })
    }
      
    if(data.footerCategory){
        data.footerCategory.forEach(item=>{
            footerCategory.innerHTML+=`<li><a href="/show">${item.title}</a></li>`
        })
    } 
    if(data.statusCategory){
        data.statusCategory.forEach(item=>{
            sideCategory.innerHTML+=`<li><a href="/show">${item.title} (12)</a> </li>`
        })
    }
})