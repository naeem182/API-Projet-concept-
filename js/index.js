// https://openapi.programming-hero.com/api/news/categories
// const loadcategory = () => {

//     fetch('https://openapi.programming-hero.com/api/news/categories')
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.log("error"))

// }
const loadcategory = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');

    const data = await res.json()
    const tab_Container = document.getElementById('tab_Container');
    data.data.news_category.slice(0, 3).forEach((categories) => {
        const div = document.createElement('div');
        div.innerHTML = `       
        <a class="tab" onclick="handleLoadNews('${categories.category_id}')">Tab ${categories.category_name}</a>       
        `
        tab_Container.appendChild(div)


    });




    console.log(data.data.news_category)

}


const handleLoadNews = async (categoryid) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/news/category/${categoryid}`)
    const data = await res.json();
    console.log(data)
    const card_Container = document.getElementById('card_Container');
    card_Container.innerHTML = ""
    data.data.forEach((news) => {
        // 
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="card w-96 bg-base-100 shadow-xl">
                    <figure><img src=${news?.image_url} alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">
                           ${news.title.slice(0, 40)}
                            <div class="badge badge-secondary">${news.rating.badge}</div>
                        </h2>
                        <p>${news.details.slice(0, 40)}</p>
                        <h3>total viwes:${news.total_view ? news.total_view : "no view"}
                        <div class="card-actions justify-between">

                            <div class="flex">


                                <div class=" w-14"><img class=" rounded-full" src=${news?.author.img} /></div>
                                <div>

                                <p class="ml-2">${news?.author?.name}</p> 
                                <p class="ml-2">${news?.author?.published_date}</p>
                                </div>


                            </div>
                    
                            <button onclick="handleModal('${news._id}')" class="btn btn-primary">Details</button>

                        </div>
                    </div>
                </div>
        
        
        
        `

        card_Container.appendChild(div)
    })

    console.log(data.data)

}


const handleModal = async (newsid) => {
    // console.log(newsid)

    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsid}`)
    const data = await res.json();

    console.log(data.data[0])

    const modal_container = document.getElementById("modal_container")
    const div = document.createElement('div');
    div.innerHTML = `
   
    <dialog id="my_modal_1" class="modal">
    <form method="dialog" class="modal-box">
        <h3 id="showdetailsphonename" class="font-bold text-lg">id:${data.data[0]._id}</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </div>
    </form>s
</dialog>
    
    `
    modal_container.appendChild(div)

    const modal = document.getElementById("my_modal_1")
    modal.showModal();


}



// const modal = document.getElementById("my_modal_1")
// modal.showModal();


loadcategory();
handleLoadNews('03')