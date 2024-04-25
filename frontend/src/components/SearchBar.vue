<script setup>

</script>

<template>
<div class="gradient-background">
    <div class="container">
        <h1 class="title">McqMate</h1>
        <p class="subtitle">For Students, From Students</p>

        <div class="input-container">
            <input type="text" class="input-field" placeholder="Search MCQ | Topic | Course">
            <button type="submit" class="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
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
}

.input-field {
    width: 100%;
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
