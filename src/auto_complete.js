const autocomplete = (input, arr) => {
    let currentFocus;
    
    input.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        
        closeAllLists();

        !val ? false
             : null; 

        currentFocus = -1;
        
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        
        this.parentNode.appendChild(a);

        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                
                b.addEventListener("click", function(e) {
                    input.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });

                a.appendChild(b);
                document.getElementById('inputCidade').style.borderBottomLeftRadius = 0;
                document.getElementById('inputCidade').style.borderBottomRightRadius = 0;
            }
        }
    });
    
    input.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");

        x ? x = x.getElementsByTagName("div")
          : null;

        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();

            if (currentFocus > -1) {
                x ? x[currentFocus].click()
                  : null;
            }
        }
    });

    const addActive = (x) => {
        !x ? false  
           : null;

        removeActive(x);

        currentFocus >= x.length ? currentFocus = 0
                                 : null;

        currentFocus < 0 ? currentFocus = (x.length - 1)
                         : null;
        
        x[currentFocus].classList.add("autocomplete-active");
    }

    const removeActive = (x) => {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    const closeAllLists = (element) => {
        const x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (element != x[i] && element != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
        document.getElementById('inputCidade').style.borderBottomLeftRadius = "25px";
        document.getElementById('inputCidade').style.borderBottomRightRadius = "25px";
    }
    
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("inputCidade"), listCidades);