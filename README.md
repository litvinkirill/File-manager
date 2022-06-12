# File-manager

List of operations and their syntax:

Navigation & working directory (nwd)
Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)
up
Go to dedicated folder from current directory (path_to_directory can be relative or absolute)
cd path_to_directory
List all files and folder in current directory and print it to console
ls
Basic operations with files
Read file and print it's content in console:
cat path_to_file
Create empty file in current working directory:
add new_file_name
Rename file:
rn path_to_file new_filename
Copy file:
cp path_to_file path_to_new_directory
Move file (same as copy but initial file is deleted):
mv path_to_file path_to_new_directory
Delete file:
rm path_to_file
Operating system info (prints following information in console)
Get EOL (default system End-Of-Line)
os --EOL
Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
os --cpus
Get home directory:
os --homedir
Get current system user name (Do not confuse with the username that is set when the application starts)
os --username
Get CPU architecture for which Node.js binary has compiled
os --architecture
Hash calculation
Calculate hash for file and print it into console
hash path_to_file
Compress and decompress operations
Compress file (using Brotli algorithm)
compress path_to_file path_to_destination
Decompress file (using Brotli algorithm)
decompress path_to_file path_to_destination