const button2 = document.getElementById("check");
const TOOL_PDF_URL="https://interskol-b2b-test.ru/toolservice/tool/pdf/"

document.getElementById('tool_text').onkeypress = function(e) {  
    if (e.keyCode === 13) {  
        searchTool() 
    }  
};  
async function tool_upload(){
    try {
 return fetch('https://interskol-b2b-test.ru/toolservice/tools',
     {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })   
      .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${JSON.stringify(response)}`);
      }
      return response.json();
    })
        .catch((err)=>{
            console.log(err)
        })

    } catch (error) {
        console.log(error)
    }
}

async function searchTool(){
    const value = document.getElementById("tool_text").value;
    const answer = document.getElementById("tool_answer");
    Array.from(answer.children).forEach((child) => child.remove());
    tool_upload().then((res)=>{
    const new_list = res.filter((el)=>{
        const code_check = Number(el.tool_code)===Number(value)
        const text_check = el.tool_name.toUpperCase().indexOf( value.toUpperCase())!==-1
        return code_check||text_check
        
    }
    )
    new_list.forEach((el)=>{
      let a = document.createElement("a");
      let figure =document.createElement("figure")
      let figcaption =document.createElement("figcaption")
    //  a.textContent = el.tool_code;
      a.setAttribute(
        "href",
        TOOL_PDF_URL+el.tool_code,
      );
      a.setAttribute("title",el.tool_code)
      a.setAttribute("target", "_blank");
      let img = document.createElement("img");
      img.setAttribute("src","./icons/pdf32x32.png")
      img.className='pdf'
      //img.setAttribute("id","pdf")
      a.appendChild(img)
      answer.appendChild(a)
    })
   }
  )
}

