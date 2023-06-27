// FIVEM RELATED ///////////////////////////////////////////////////////////////////////////////////
window.addEventListener('message', function(event) {
    var item = event.data;
    if (item.showUI == undefined) {
        return
    }

    if (item.showUI == null) {
        return
    }

    if (item.showUI) {
        document.getElementById("Frame").style.display = "flex"
    } else {
        document.getElementById("Frame").style.display = "none"
    }

    if (item.type == "ucadems_profile_Lookup") {
        console.log(item.ddp.DPhone)
        document.getElementById("SJournal_Profile_Phone").value = `Phone: ${item.ddp.DPhone}`
        document.getElementById("SJournal_Profile_Birth").value = `Birth: ${item.ddp.DBirth}`

        if (item.ddp.DGender == "1") {
            document.getElementById("SJournal_Profile_Gender").value = "Female"
        } else if (item.ddp.DGender == "0") {
            document.getElementById("SJournal_Profile_Gender").value = "Male" 
        }
    }

    // When the page loads the data received will be set to this widget
    if (item.type == "getplayers") {
        let Names = ""
        let splitdata = item.ddp.payload.split("E|")
        splitdata.forEach(element => {
            if (element != "") {
                Names += `</br><button class="MenuButton_Profile" style="margin-left:10%; width: 80%; height: 80%;" onclick="Profile_Load('${element}')">${element}</button>`
            }
        });
        
        document.getElementById("profiles").innerHTML = Names
    }
});

async function CloseCad(){
    let x = await fetch(`https://ucade/ucadems`, {
        method: 'POST',
        body: JSON.stringify({close: "1"})
    })
}

async function RefreshProfiles() {
    let x = await fetch(`https://ucade/ucadems_profiles`, {
        method: 'POST',
    })
}

// Get's data about a specific profile
async function GetProfile(profile) {
    let x = await fetch(`https://ucade/ucadems_profileLookup`, {
        method: 'POST',
        body: JSON.stringify({name: profile})
    })
}
