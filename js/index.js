const body = document.querySelector("body");
// this is for loading at refresh
document.addEventListener("DOMContentLoaded", function () {
  const theme = sessionStorage.getItem("theme");
  if (theme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.add("light");
  }

  // toc head
  const toc = document.getElementsByClassName("table-of-contents")[0];
  // if toc exists if doesnt do nothing
  if (toc) {
    const newTOC = document.createElement("h3");
    newTOC.textContent = "CONTENTS";
    newTOC.classList.add("table-of-contents-header");
    toc.before(newTOC);
    // newTOC.onclick = handleTocToggle();
    // not including () here was causing twice click issue

    // usinng a wrapper for header and content of toc
    const tocWrapper = document.createElement("div");
    tocWrapper.classList.add("toc-wrapper");
    toc.parentNode.insertBefore(tocWrapper, toc);
    tocWrapper.appendChild(newTOC);
    tocWrapper.appendChild(toc);
  }

  // the page list is default hidden this sis a temp solution
  // const tableOfPages = document.querySelector('.table-of-pages');
  // tableOfPages.classList.remove('hidden');
});
// for toggle

function handleDarkModeToggle() {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    sessionStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    sessionStorage.setItem("theme", "dark");
  }
}

// function handleTocToggle() {
//     const tocHeader = document.querySelector('.table-of-contents-header');
//     const toc = document.querySelector('.table-of-contents');

//     tocHeader.addEventListener('click', () => {
//         toc.classList.toggle('hidden');
//      const footer=document.getElementsByClassName('footer')[0];
//      footer.classList.toggle('individual-page-footer');
//     });
// }
// this seems redundant lol. Change

// document.addEventListener('DOMContentLoaded', function (){
// const tocWrapper= document.getElementsByClassName('toc-wrapper')[0];

// if(!tocWrapper){
//     console.log("Nada");
//     const navbar =document.getElementsByClassName('navbar')[0];
//     console.log(navbar)
//    navbar.style.color = "blue !important";

// }
// else{
//     const navbar =document.getElementsByClassName('navbar')[0];
//     console.log(navbar)
// }
// })

document.addEventListener("DOMContentLoaded", function () {
  const tocWrapper = document.getElementsByClassName("toc-wrapper")[0];
  const navbar = document.getElementsByClassName("navbar")[0];
  const footer = document.getElementsByClassName("footer")[0];
  // const individualPageFooter=document.getElementsByClassName('individual-page-footer')[0];

  const bodyMainContainer = document.getElementsByClassName(
    "body-main-container"
  )[0];

  const headerName = document.querySelector(".header-name");
  if(!headerName){
  const headerHeight = 0;
    const navbarHeight = 0;
  }
        const headerHeight = headerName.getBoundingClientRect().height;
  const navbarHeight = navbar.getBoundingClientRect().height;
    const totalHeight = navbarHeight + headerHeight;
  let totalHeightString = totalHeight + "px";

  // console.log(headerHeight, navbarHeight, totalHeight);
  // console.log(totalHeightString, typeof(totalHeightString));

  const tocHeader = document.querySelector(".table-of-contents-header");
  const toc = document.querySelector(".table-of-contents");

// for large devices only where the toc is in the left whole
const viewportWidth= window.innerWidth;
console.log(viewportWidth);

  if (!tocWrapper) {
    // console.log("Nada");

    // console.log(navbar);
    // console.log(individualPageFooter)
    console.log(tocWrapper)
    navbar.style.width = "100%";
    navbar.style.marginLeft = "0px";
    navbar.style.marginRight = "0px";
    if(footer){
 if(footer.classList.contains('individual-page-footer')){

      footer.classList.remove("individual-page-footer");
    }
    }
   
  }
  else if (viewportWidth < 1426) {
    // Small/medium devices - handle separately
    footer.classList.remove("individual-page-footer");
     tocHeader.style.display="flex";
            tocHeader.style.alignItems="center";
                    tocHeader.style.height = navbarHeight + "px";
        tocHeader.style.marginTop = "0";
        tocHeader.style.marginBottom = "0";
    tocHeader.addEventListener("click", () => {
        toc.classList.toggle("hidden");

    });
}
  
  else {
    const computedHeight = parseFloat(getComputedStyle(tocWrapper).height);
    const viewportHeight = window.innerHeight;
    if (computedHeight > viewportHeight * 0.9) {
      //   footer.classList.remove('individual-page-footer');
      // collides i.e is large
      tocHeader.addEventListener("click", () => {
        toc.classList.toggle("hidden");
        footer.classList.toggle("individual-page-footer");
        if (toc.classList.contains("hidden")) {
        //   console.log("Hiddden now");
          tocHeader.style.height = totalHeightString;
        }
        else if(!toc.classList.contains('hidden')){
            // console.log("susbvjb")
             tocHeader.style.height = navbarHeight + "px";
        }
      });
    } else {
      footer.classList.remove("individual-page-footer");
      tocHeader.addEventListener("click", () => {
        toc.classList.toggle("hidden");
        if (toc.classList.contains("hidden")) {
          tocHeader.style.height = totalHeightString;
        } else {
        //   console.log("Showing");
          tocHeader.style.height = navbarHeight + "px";
        }
      });
    }
  }





// if(viewportWidth<1426){
//      tocHeader.addEventListener("click", () => {
//         toc.classList.toggle("hidden");
//              tocHeader.style.height = navbarHeight + "px";
//              tocHeader.style.marginTop="0";
//              tocHeader.style.marginBottom="0";
//       });
//       console.log(tocHeader);
// }






  const hamburger = document.getElementById("hamburger");
  const navbarLinks = document.getElementById("navbarLinks");

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation(); // IMPORTANT
    hamburger.classList.toggle("active");
    navbarLinks.classList.toggle("open");
    navbarLinks.style.marginTop = "30px";
  });

  // clicking inside menu should not close it
  navbarLinks.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // clicking anywhere else closes it
  body.addEventListener("click", function () {
    hamburger.classList.remove("active");
    navbarLinks.classList.remove("open");
  });
});
