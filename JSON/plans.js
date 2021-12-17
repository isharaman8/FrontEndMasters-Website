class Premiums {
	constructor(planType, planPrice, description) {
		this.planType = planType;
		this.planPrice = planPrice;
		this.description = description;
	}
}

const plans = [
	{
		...new Premiums(
			"MONTHLY",
			"$39",
			"Access all premium courses, workshops, and mobile apps. Renewed monthly."
		),
	},
	{
		...new Premiums(
			"YEARLY",
			"$390",
			`Access everything. Renewed yearly. Save $78 per year!`
		),
	},
	{
		...new Premiums(
			"MONTHLY TEAM",
			"$195",
			"Access for 10 people at your company, renewed monthly. Save 50% on our monthly plans!"
		),
	},
	{
		...new Premiums(
			"YEARLY TEAM",
			"$1950",
			"Access for 10 people at your company, renewed yearly. Save 50% on our yearly plans!"
		),
	},
];

export default plans;
