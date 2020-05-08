<template>
    <div class="loading">
        <div v-if="user.loadingCount > 0">
            <div class="mask"></div>
            <div class="animation">
                <div class="lds-css ng-scope">
                    <div style="width:100%;height:100%" class="lds-ellipsis">
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import User from '@/service/user';
export default {
    name: "loading",
    data(){
        return{
            user: User
        }
    }
    
};
</script>
