function afficherResultat(score, totalMots)
{
    let scoreSpanArea = document.querySelector('.zoneScore span')
    scoreSpanArea.textContent = `${score} / ${totalMots}`
}

function afficherProposition(proposition)
{
    let zoneProposition = document.querySelector('.zoneProposition')
    zoneProposition.innerHTML = proposition
}

function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je vais de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

function validerNom(nom){
    if(nom.length < 2) throw new Error('Nom trop court')
}

function validerEmail(email){
    let emailReg = new RegExp('[a-z-._]+@[a-z-._]+\\.[a-z-._]+')
    if(!(emailReg.test(email))) throw new Error('Mail incorrect')
}

function gererFormulaire(score)
{
    let form = document.querySelector("form")

    form.addEventListener('submit', (event)=>{
        event.preventDefault()

        let nom = document.getElementById("nom").value
        let email = document.getElementById("email").value

        try
        {
            validerEmail(email)
            validerNom(nom)
            afficherEmail(nom, email, score)
            afficherMessageErreur("")
        }

        catch(erreur)
        {
            afficherMessageErreur(erreur.message)
        }
    })  
}

function afficherMessageErreur(error)
{
    let spanElement = document.querySelector('.popup span')

    if(!spanElement)
    {
        let popupElement = document.querySelector('.popup')
        spanElement = document.createElement('span')
        popupElement.appendChild(spanElement)
        
    }
    
    spanElement.textContent = error
}

function lancerJeu()
{
    let score = 0
    let i = 0
    let j = 0
    let listePropositions = listeMots
    let inputEcriture = document.getElementById("inputEcriture")
    let btnValiderMot = document.getElementById('btnValiderMot')
    let listeOptionSource = document.querySelectorAll("input[name=optionSource]")

    afficherProposition(listePropositions[i])

    for(let j=0; j < listeOptionSource.length; j++)
    {
        listeOptionSource[j].addEventListener('change', (event) => {
            console.log(event.target)
            if(event.target.value === "2") 
            {
                listePropositions = listePhrases
            }
            else{listePropositions = listeMots}
            afficherProposition(listePropositions[i])
        })
    }

    btnValiderMot.addEventListener("click", ()=>{
        if(listePropositions[i] === inputEcriture.value) score++
        i++
        afficherResultat(score, i)
        inputEcriture.value = ""

       if(listePropositions[i] ===  undefined)
        {
            afficherProposition("Jeu terminé")
            btnValiderMot.disabled = true
        }
        else{
            afficherProposition(listePropositions[i])
        }

    })

    initAddEventListenerPopup()

    gererFormulaire(score)

}





