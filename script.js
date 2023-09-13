document.addEventListener('DOMContentLoaded', function() {
    let text = "Initiating data sequence...";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("loadingSequence").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    function decodeBio() {
        let bioText = "A passionate computer scientist with experience in data research, ERP system enhancement, and software development. Proficient in various languages and platforms, with notable projects in cryptographic frameworks and data management systems.";
        let j = 0;
        let bioElement = document.getElementById("bioData");

        function typeBio() {
            if (j < bioText.length) {
                bioElement.innerHTML += bioText.charAt(j) === ' ' ? ' ' : '*';
                j++;
                setTimeout(typeBio, 20);
            } else {
                revealBio(bioText);
            }
        }

        function revealBio(bioText) {
            bioElement.innerHTML = bioText;
        }

        typeBio();
    }

    document.getElementById("about").addEventListener('mouseover', decodeBio, { once: true });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            let glow = document.createElement('div');
            glow.className = 'glow-border';
            this.appendChild(glow);
            setTimeout(() => {
                this.removeChild(glow);
            }, 2000);
        });
    });

    document.querySelectorAll('.skill').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            let glow = document.createElement('div');
            glow.className = 'glow-pulse';
            this.appendChild(glow);
            setTimeout(() => {
                this.removeChild(glow);
            }, 1000);
        });
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Command (message) sent!');
        this.reset();
    });
});
