summary.txt : hydrocarbon2_report.txt
	gawk '/^==={35}/{a=1;next};\!a{next};/^>/{x=$1};/^\t>/{y=$2};/^\t\t/{sub("^>","",x);print x,y,$1}' $< > $@
