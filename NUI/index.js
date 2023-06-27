// FUNCTIONS FOR WEBSITE BELOW ///////////////////////////////////////////////////////////////////////

// Close the UI
let NewIncident_UI = false
function NewIncident() {
    NewIncident_UI = !NewIncident_UI
    if (NewIncident_UI) {
        document.getElementById("SJournal_Profiles_Incidents").style.display = 'block'
        document.getElementById("SJournal_Profiles").style.display = 'none'
        return
    }

    document.getElementById("SJournal_Profiles_Incidents").style.display = 'none'
    document.getElementById("SJournal_Profiles").style.display = 'block'
}

// When this fucntion is executed the name will show up on the incident page and automaticly open it
async function Profile_Load(src) {
    document.getElementById("Incident_Name").value = src
    document.getElementById("Profilename").value = src
    NewIncident()
    await GetProfile(src)
}


// WEBPAGES MENU ///////////////////////////////////////////////////////////////////////////////////
// Open next Search for journal page
async function Home() {
    await HideUI("home", "Home_Button")
}
async function SJournal() {
    await HideUI("SJournal_page", "SJournal_Button")
}
async function UnitsReports() {
    await HideUI("UReport_page", "UReport_Button")
}



async function HideUI(UI_To_Show, UI_Buttons_Show) {
    let UI = ["SJournal_page", "UReport_page"]
    let UI_Buttons = ["Home_Button", "SJournal_Button", "Home2_Button", "UReport_Button"]
    UI.forEach(element => {
        if (UI_To_Show == element) {
            document.getElementById(element).style.display = "flex"
        }

        if (UI_To_Show != element) {
            document.getElementById(element).style.display = "none"
        }
    });

    // Set buttons color on press
    UI_Buttons.forEach(element => {
        if (UI_Buttons_Show == element) {
            document.getElementById(element).style.backgroundColor = "rgb(92, 92, 92)"
        }

        if (UI_Buttons_Show != element) {
            document.getElementById(element).style.backgroundColor = "rgb(56, 56, 56)"
        }
    });
}
// END OF WEBPAGES MENU //////////////////////////////////////////////////////////////////////////