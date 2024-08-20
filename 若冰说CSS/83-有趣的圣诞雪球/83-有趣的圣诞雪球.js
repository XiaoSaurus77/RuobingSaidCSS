const globe = document.querySelector('.snowglobe');
        const head = document.querySelector('#headAnimation');
        const body = document.querySelector('#bodyAnimation');
        const snowglobe = document.querySelector('#snowglobeAnimation');
        const shadow = document.querySelector('#shadowAnimation');


        globe.addEventListener('click', function() {
            if( head.classList.contains('head-animation') ) return;
            head.classList.add('head-animation');
            body.classList.add('body-animation');
            snowglobe.classList.add('snowglobe-animation');
            shadow.classList.add('shadow-animation');
            addSnowAnimation();
            setTimeout(snowFallAnimation, 300);
            setTimeout(removeAnimations, 4000);
        });

        function removeAnimations() {
            head.classList.remove('head-animation');
            body.classList.remove('body-animation');
            snowglobe.classList.remove('snowglobe-animation');
            shadow.classList.remove('shadow-animation');
            globe.style.cursor = 'pointer';
        }

        function addSnowflakes() {
            const snowContainer = document.querySelector('.snow');
            for (let i = 0; i < 60; i++) {
                const width = (Math.floor(Math.random() * 8) + 5) / 10;
                const y = Math.floor(Math.random() * 100);
                const x = Math.floor(Math.random() * 100);
                const html = `<div class="snowflake" style="width: ${width}rem; height: ${width}rem; left: ${y}%; top: ${x}%;"></div>`;
                snowContainer.insertAdjacentHTML('beforeend', html);
            }
        }
        function addSnowAnimation() {
            globe.style.cursor = 'default';
            const snowflakes = document.querySelectorAll('.snowflake');
            snowflakes.forEach(flake => {
                const x = Math.floor(Math.random() * 15) + 8;
                flake.style.transform = `translate(0, ${-x}rem)`;
                flake.style.opacity = 1;
            });
        }
        function snowFallAnimation() {
            console.log('fall');
            const snowflakes = document.querySelectorAll('.snowflake');
            snowflakes.forEach(flake => {
                const duration = (Math.floor(Math.random() * 500) + 100) / 100;
                flake.style.transition = `all ${duration}s`;
                console.log(flake);
                flake.style.transform = 'translate(0,0)';
                console.log(flake);
                flake.style.opacity = 0;
            });
            setTimeout(removeSnowAnimation, 3000);
        }

        function removeSnowAnimation() {
            const snowflakes = document.querySelectorAll('.snowflake');
            snowflakes.forEach(flake=> {
                flake.style.transition = ' all .25s';
            });
        }
        addSnowflakes();