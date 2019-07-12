<template>
    <div class="row">
        <div class="col-md-3 mx-auto">
            <div class="card card-body">
                <img src="../assets/logo.png" class="logo">
                <h3 class="text-center">Account Register</h3>
                <form method="POST" action="">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="name" class="form-control" required name="name"> 
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" required name="email"> 
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" required name="password">
                    </div>
                    <div class="form-group">
                        <label for="password2">Confirm Password</label>
                        <input type="password" class="form-control" required name="password2">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .logo {
        width: 120px;
        margin:auto;
    }
</style>

