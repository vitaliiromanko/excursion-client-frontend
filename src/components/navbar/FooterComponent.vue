<template>
  <footer class="p-3 mt-3 border-top">
    <div class="container">
      <div class="my-4">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="d-flex justify-content-center">
              <router-link class="link" to="/">
                <h2 class="name position-relative">My Excursion</h2>
                <div class="name-underline position-absolute"></div>
              </router-link>
            </div>

            <div class="d-flex justify-content-around flex-wrap mt-5">
              <div class="px-3 py-1">
                <p class="contact-title">Зв'яжіться з нами:</p>
              </div>

              <div class="px-3 py-1">
                <a
                  class="link d-flex align-items-center"
                  href="mailto:info@example.com"
                >
                  <font-awesome-icon icon="fa-solid fa-envelope" size="lg" />
                  <p class="ms-1 fw-bold">info@example.com</p>
                </a>
              </div>

              <div class="px-3 py-1">
                <div>
                  <a
                    class="link d-flex align-items-center"
                    href="tel:+380930584712"
                  >
                    <font-awesome-icon icon="fa-solid fa-phone" size="lg" />
                    <p class="ms-1 fw-bold">+380 93 058-47-12</p>
                  </a>
                </div>

                <div class="mt-1">
                  <a
                    class="link d-flex align-items-center"
                    href="tel:+380650584712"
                  >
                    <font-awesome-icon icon="fa-solid fa-phone" size="lg" />
                    <p class="ms-1 fw-bold">+380 65 058-47-12</p>
                  </a>
                </div>

                <div class="mt-1">
                  <a
                    class="link d-flex align-items-center"
                    href="tel:+380730584712"
                  >
                    <font-awesome-icon icon="fa-solid fa-phone" size="lg" />
                    <p class="ms-1 fw-bold">+380 73 058-47-12</p>
                  </a>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-center mt-3">
              <div class="mx-3">
                <a class="link" href="https://twitter.com">
                  <font-awesome-icon
                    class="social-icon"
                    icon="fa-brands fa-square-twitter"
                  />
                </a>
              </div>

              <div class="mx-3">
                <a class="link" href="https://www.instagram.com">
                  <font-awesome-icon
                    class="social-icon"
                    icon="fa-brands fa-square-instagram"
                  />
                </a>
              </div>

              <div class="mx-3">
                <a class="link" href="https://www.facebook.com">
                  <font-awesome-icon
                    class="social-icon"
                    icon="fa-brands fa-square-facebook"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-md-12 text-center">
            <p class="copyright">
              © 2023 - {{ new Date().getFullYear() }} MyExcursion.com - All
              Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style scoped>
h2,
p {
  margin: 0;
}

.link {
  text-decoration: none;
  color: black;
  transition: 0.3s;
}

.link:hover {
  color: #ffb947;
  transition: 0.3s;
}

.name {
  font-weight: bold;
}

.name-underline {
  width: 120px;
  border-top: 4px solid;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
}

.contact-title {
  font-weight: bold;
  font-size: 23px;
  color: #ffb947;
  line-height: 23px;
}

.social-icon {
  font-size: 40px;
}

.copyright {
  color: #838383;
}
</style>
