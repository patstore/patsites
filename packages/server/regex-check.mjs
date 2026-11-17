// Compares the control-character class with the unicode-escape form below.
// eslint-disable-next-line no-control-regex
const original = /[<>:"/\\|?*\x00-\x1f]/;
const next = new RegExp(String.raw`[<>:"/\\|?*\u0000-\u001f]`);
const samples = [
	"a<b",
	"a>b",
	"a:b",
	'a"b',
	"a/b",
	"a\\b",
	"a|b",
	"a?b",
	"a*b",
	"ok-name",
	`${String.fromCharCode(1)}x`,
	`${String.fromCharCode(31)}x`,
	`${String.fromCharCode(32)}x`
];
for (const sample of samples) {
	if (original.test(sample) !== next.test(sample)) {
		console.log("mismatch", JSON.stringify(sample));
	}
}
console.log(next.source);
