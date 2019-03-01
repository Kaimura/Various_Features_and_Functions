// this code appends an energy label to products that have the efficiency of A, A+, A++, A+++, A-, B, C, D
var URL_5 = document.location.href.toLowerCase();
// var i = 0;
if ((URL_5.indexOf(".%MYCOMPANY%.com/de/de/mcommerce/shoppingcart") >= 0 || URL_5.indexOf(".%MYCOMPANY%.com/webapp/wcs/stores/servlet/orderitemdisplaymobile") >= 0 || URL_5.indexOf(".ikea.com/webapp/wcs/stores/servlet/promotioncodemanage") >= 0 || URL_5.indexOf(".ikea.com/webapp/wcs/stores/servlet/morderitemdisplayview") >= 0 )&& document.getElementById("energyLabelCartpage")== null) {
    var productId;
        for(var i = 0; i < utag.data.product_ids.length; i++) {
            productId = utag.data.product_ids[i].slice(-3);
            fetchEnergyLabel(productId, utag.data.product_ids[i], i);
        }
}

function fetchEnergyLabel(lastThreeDigits, wholeProductId, counter) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        //  console.log(xhttp.responseText); //auskommentieren
        if (this.readyState == 4 && this.status == 200) {
            if(xhttp.responseText.indexOf("A<sup>+</sup></span>") >= 0 ) { //A+
                createLabel(wholeProductId, "A+", counter, "rgb(103, 164, 55)"); //alternativ color rgb(188, 199, 20);
            }
            else if(xhttp.responseText.indexOf("A<sup>++</sup></span>") >= 0 ) { //A++
                createLabel(wholeProductId, "A++", counter, "rgb(103, 164, 55)");
            }
            else if(xhttp.responseText.indexOf("A<sup>+++</sup></span>") >= 0 ) { //A+++
                createLabel(wholeProductId, "A+++", counter, "rgb(103, 164, 55)");
            }
            else if(xhttp.responseText.indexOf("A<sup>-</sup></span>") >= 0 ) { //A-
                createLabel(wholeProductId, "A-", counter, "rgb(246, 255, 0)"); //yellow
            }
            else if(xhttp.responseText.indexOf('<span class="sr-only">A</span>') >= 0) { //A
                createLabel(wholeProductId, "A", counter, "rgb(103, 164, 55)"); //green
            }
            else if(xhttp.responseText.indexOf('<span class="sr-only">B</span>') >= 0 ) { //B
                createLabel(wholeProductId, "B", counter, "rgb(246, 255, 0)"); //yellow
            }
            else if(xhttp.responseText.indexOf('<span class="sr-only">C</span>') >= 0) { //C
                createLabel(wholeProductId, "C", counter, "rgb(227, 175, 0)"); //yellow-orange
            }
            else if(xhttp.responseText.indexOf('<span class="sr-only">D</span>') >= 0) { //D
                createLabel(wholeProductId, "D", counter, "rgb(235,90,70)"); //red
            }

        }
    };
    xhttp.open("GET", "https://m2.%MYCOMPANY%.com/de/de/products/" + lastThreeDigits + "/" + wholeProductId + "-fragment.html", true);
    xhttp.send();
}


function createLabel(productId, label, counter, rgb) {
    var link = document.createElement("a");
    link.id = "energyLabelCartpage";
    link.style.display = "inherit";
    // link.href = 'javascript:energyLabelBox.open("20354566");'; //Id does not need to be replaced it seems
    link.href = 'javascript:energyLabelBox.open("'+ productId +'");';

    var span1 = document.createElement("span");
    span1.id = "leftArrow";
    span1.style.borderRight = "9px solid " + rgb;
    span1.style.float= "left";
    span1.style.borderTop = "8px solid transparent";
    span1.style.borderBottom = "5.5px solid transparent";

    var span2 = document.createElement("span");
    span2.id = "arrowContent";
    span2.style.background = rgb;
    span2.style.paddingRight = "3px";
    span2.style.color = "#fff";
    span2.innerText = label;

    link.appendChild(span1);
    link.appendChild(span2);

    // document.querySelectorAll("div.ikea-shoppinglist-column4")[counter].appendChild(link);
    document.querySelectorAll("div.ikea-product-pricetag-price > p")[counter].appendChild(link);
}
