#!/usr/bin/python

# import libraries
import sys # for argument vector
import optparse # to parse arguments
import operator

# describe what the script does
what_i_do = "Simple script to transform a table hierarchy into a d3 sunburst-compatible file."
usage = "myscript.py -i <input_file> -o output_file"

# initialize the parser
parser = optparse.OptionParser(usage = usage, epilog = what_i_do)
parser.add_option("-i", "--input_file", dest="input_file", default=None,
                   help='input file csv/tsv of hierarchical table [Required]')
parser.add_option("-o", "--output_file", dest="output_file", default=None,
                   help='output file to write to')

def add_to_structure(fields, structure):
    if len(fields) == 0 or fields[0] == "NA":
        if "count" not in structure:
            structure["count"] = 0
        structure["count"] += 1
        return
    if fields[0] not in structure:
        structure[fields[0]] = {}
    add_to_structure(fields[1:], structure[fields[0]])

def create_sunplot_rows(lines, prefixes, structure):
    if type(structure) == int:
        return
    if "count" in structure:
        line = "-".join(prefixes) + "," + str(structure["count"])
        lines.append(line)
    for child in structure:
        if child == "count":
            continue
        prefixes.append(child)
        create_sunplot_rows(lines, prefixes, structure[child])
    if len(prefixes) > 0:
        prefixes.pop()

def count_dashes(line):
    count = 0
    for char in line:
        if char == "-":
            count += 1
    return count

# the main function of the script
def main():
    (opts, args) = parser.parse_args()
    
    # opts is a dictionary that contains all the options
    if not opts.input_file:
        print "Error: Input file not specified"
        print usage
        exit()
    
    # read lines
    fh = open(opts.input_file, "r")
    lines = fh.readlines()
    fh.close()
    
    # data structure for samples
    hierarhical_structure = {}
    
    for line in lines[1:]:
        fields = line.split(",")
        fields = map(str.strip, fields, "\n")
        fields = map(str.strip, fields)
        add_to_structure(fields, hierarhical_structure)
    
    lines = []
    create_sunplot_rows(lines, [], hierarhical_structure)
    
    
    line_to_depth = {}
    for line in lines:
        line = line.replace(" ", "_")
        line_to_depth[line] = count_dashes(line)
    
    # print 
    out_fh = open(opts.output_file, "w")
    for line in sorted(line_to_depth, key=line_to_depth.get, reverse=True):
        out_fh.write(line + "\n")
    out_fh.close()
    

if __name__ == "__main__":
    main()