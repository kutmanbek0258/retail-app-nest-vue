<template>

	<!-- Salary Card -->
	<a-card :bordered="false" class="widget-2 h-full" v-on:click="openLink(content.link)">
		<a-statistic :value="value" :prefix="prefix">
			<template #title>
				<div class="icon" v-html="icon"></div>
				<h6>{{ $t(title) }}</h6>
				<p>{{ $t(content.body) }}</p>
			</template>
		</a-statistic>
	</a-card>
	<!-- / Salary Card -->

</template>

<script>

import router from "../../router";

	export default ({
		props: {
			value: {
				type: Number,
				default: 0,
			},
			prefix: {
				type: String,
				default: "+$",
			},
			icon: {
				type: String,
				default: "",
			},
			title: {
				type: String,
				default: "",
			},
			content: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {
			}
		},

    methods: {
      openLink(link){
        console.log(link)
        router.push(link);
      },
    }

	})

</script>