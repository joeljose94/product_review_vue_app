app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `       
<div class="product-display">
    <div class="product-container">
        <div class="product-image">
            <img :class="{ 'out-of-stock-img': !inStock }" :src="getImage" />
        </div>

        <div class="product-info">
            <h1> {{ product}} </h1>
            <!-- Attribute Rendering -->
            <a :href="url" target="_blank">Click here for more info</a>

            <!-- Conditional Rendering-->
            <!--<p v-if="inventory > 5">In Stock</p>
            <p v-else-if="inventory <= 5 && inventory > 0">Running out</p>
            <p v-else>Out of Stock</p> -->

            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p v-show="onSale">On Sale now!</p>
            <p>Shipping: {{ shipping }}</p>
            <product-details :details="details"></product-details>
            <p>Colour:</p>
            <div class="color-circle" v-for="(variant, index) in variants" :key="variant.id"
                @mouseover="updateVariant(index)" :style="{'background-color': variant.colour}">
            </div>
            <br>
            <p>Size:</p>

            <div v-for="size, index in sizes" :key="index">
                {{ size }}
            </div>
            <!-- Event Handling -->
            <button class="button" :class="{ disabledButton: !inStock}" @click="addToCart" :disabled="!inStock">
                Add To Cart
            </button>
            <button class="button" @click="removeFromCart">Remove Item</button>
            <review-list :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>
    </div>
</div>
`,
    data() {
        return {
            product: 'Socks',
            url: 'https://en.wikipedia.org/wiki/Sock',
            onSale: false,
            details: ['40% Cotton', '40% Wool', '20% polyster'],
            variants: [
                { id: 2234, colour: 'green', image: '/assets/images/socks_green.jpg', qty: 15 },
                { id: 2235, colour: 'blue', image: './assets/images/socks_blue.jpg', qty: 0 }
            ],
            sizes: ['S', 'M', 'L'],
            selectedVariant: 0,
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
            /* if (this.inventory > 0) {
                 this.inventory--
             }
             if (this.inventory < 1) {
                 this.inStock = false
             }
             console.log(this.inventory) */
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
            /*if (this.cart > 0) {
                this.cart--
            }
            if (this.inventory < 15) {
                this.inventory++
            }
            if (this.inventory > 0) {
                this.inStock = true
            }
            //console.log(this.inventory) */
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed: {
        getImage() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].qty
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
})