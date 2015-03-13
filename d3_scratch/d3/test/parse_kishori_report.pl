#!perl

$blast_report = $ARGV[0] || die "USAGE: $0 blast_report\n";

open (REPORT, $blast_report) || die "cannot open $blast_report for reading: $!";

# create table in database
system("sqlite3 test.db \"DROP TABLE queryids; \"");
system("sqlite3 test.db \"CREATE TABLE IF NOT EXISTS queryids ( sample varchar(50), target varchar(50), query_id varchar(100) ); \"");

while (<REPORT>) {
    if (/(^\>)(\w*)/) {
        $sample_name = $2;
    } elsif(/(^\t\>)(.*)/) {
        $target_name = $2;
    } elsif(/(^\t\t)(.*)/) {
        $query_id = $2;
        print "sample: $sample_name target: $target_name query: $query_id\n";
        system("sqlite3 test.db \"INSERT INTO queryids (sample, target, query_id) VALUES ('$sample_name', '$target_name', '$query_id') ;\"");
    }  else {
        # skip this data
    }
}



close(REPORT);

