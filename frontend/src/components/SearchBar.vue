<script setup>

</script>

<template>
<div class="gradient-background">
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
      </nav>
    <div class="container">
        <h1 class="title">Movie Sphere</h1>
        <p class="subtitle">What to watch next?</p>

        <div class="input-container">
            <input type="text" class="input-field" placeholder="Search for a Movie">
            <button type="submit" class="search-button">
            </button>
        </div>
    </div>
</div>
</template>

<style>
.gradient-background {
    height: 400px;
    background: linear-gradient(to bottom left, #4f46e5, #805ad5, #a971c2);
}

.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    max-width: 100%;

}

.title {
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
}

.subtitle {
    color: #cbd5e0;
}

.input-container {
    position: relative;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 30rem;
    box-shadow: #454647 15px 15px;
}

.input-field {
    width: 95%;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
}

.search-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
</style>
