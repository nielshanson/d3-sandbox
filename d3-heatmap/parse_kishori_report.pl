#!perl

$blast_report = $ARGV[0] || die "USAGE: $0 blast_report\n";

open (REPORT, $blast_report) || die "cannot open $blast_report for reading: $!";

# create table in database
system("sqlite3 test.db \"DROP TABLE queryids; \"");
system("sqlite3 test.db \"CREATE TABLE IF NOT EXISTS queryids ( sample varchar(50), target varchar(50), query_id varchar(100) ); \"");

while (<REPORT>) {
    if (/(^\>)(\w*)/) {
        $sample_name = $2;
        $sample_name =~ s/\s+//g ; # replace white-space
    } elsif(/(^\t\>)(.*)/) {
        $target_name = $2;
        $target_name =~ s/\s+//g ; # replace white-space
    } elsif(/(^\t\t)(.*)/) {
        $query_id = $2;
        print "sample: $sample_name target: $target_name query: $query_id\n";
        system("sqlite3 test.db \"INSERT INTO queryids (sample, target, query_id) VALUES ('$sample_name', '$target_name', '$query_id') ;\"");
    }  else {
        # skip this data
    }
}

system("sqlite3 test.db \"DROP TABLE blast_results; \"");
system("sqlite3 test.db \"CREATE TABLE IF NOT EXISTS blast_results ( query_id varchar(100), filename varchar(100), start integer, length integer, evalue real, bitscore real, bsr real, PRIMARY KEY (filename, query_id) ); \"");

@files = <./blast_outputs/*>;

foreach $file (@files) {
    open (CURRENT, $file);
        while(<CURRENT>) {
            # Sequences to keep:
            if (m/^Query= *(\S+)/ || m/^<b>Query=<\/b>\s*(\S+)/) { 
              if (defined $seq) {
                $length = $t - $pos;
                $seq =~ s/\s+//g;
                $file =~ s/\s+//g;
                $output = "sqlite3 test.db \"INSERT INTO blast_results (query_id, filename, start, length) VALUES ('$seq', '$file', '$pos', '$length' )\"";
                system($output);
                }
                $seq=$1; $pos=$t;
            }
            
            if (m/^T?BLAST[PXN] /) {$pos=$t;}

            # Stuff to delete:
            if (m/^  Database:/) {$pos=$t;}

            $t=tell(CURRENT); #The start of the next record
        }
    
    close(CURRENT);
    
}

close(REPORT);

