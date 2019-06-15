<template>
  <header id="header">
    <nav id="nav" class="navbar navbar-expand-xl navbar-dark bg-dark navbar-fixed-top">
        <a class="navbar-brand" href="#">Otokogi App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav3" aria-controls="navbarNav3" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav3">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'BaseHeader'
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
  width: 100%;
  height: 10vh;
}
</style>
