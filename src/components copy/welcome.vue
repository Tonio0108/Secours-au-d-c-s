<template>
    <div id="welcome">
        <div>
            <Transition>
                <div id="text">
                    <h1>BONJOUR</h1>
                </div>
            </Transition>   
                <div id="cercle">
                    <div class="circle" id="c1"></div>
                    <div class="circle" id="c2"></div>
                    <div class="circle" id="c3"></div>
                    <div class="circle" id="c4"></div>
                    <div class="circle" id="c5"></div>
                </div> 

        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.animateCircles();
    },
    methods: {
       animateCircles() {
            const text = document.getElementById('text')
            const circles = document.querySelectorAll('.circle');
            circles.forEach((circle, index) => {
                setTimeout(() => {
                    circle.style.backgroundColor = this.getColor(index);
                    text.style.color = this.getColor(index)
                    if(index === circles.length -1){
                        setTimeout(() => {
                            this.$router.push('/statistique')
                        }, 2000)
                    }
                }, index * 600); // intervalle de 500ms entre chaque changement
            });
        },
        getColor(index) {
            const colors = [
                'rgb(255, 255, 255)', 
                'rgb(194, 191, 191)', 
                'rgb(128, 128, 128)', 
                'rgb(82, 82, 82)', 
                'rgb(12, 12, 12)'
            ];
            return colors[index];
        }
    }
}
</script>

<style>
    #welcome {
        display: grid;
        place-items: center;
        height: 100%
    }
    h1 {
        font-size: 70px;
        transition: color 1s ease;
    }
    #cercle {
        display: inline-flex;
        justify-content: space-between;
    }
    .circle {
        width: 45px;
        height: 45px;
        border: solid 1px black;
        border-radius: 50%;
        margin-left: 15px;
        background-color: rgb(255, 255, 255);
        transition: background-color 1s ease;
    }


/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>