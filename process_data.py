# Define file paths
overlap_file = "data/overlap_with_version-25.1.0.txt"
dependencies_file = "data/teku-25.1.0_dependencies_all_gav.txt"
output_file = "data/teku_filtered_dependencies.txt"

# Read the overlap file (lines to remove)
with open(overlap_file, "r", encoding="utf-8") as f:
    lines_to_remove = set(line.strip() for line in f)

# Read the dependencies file and filter out the lines
with open(dependencies_file, "r", encoding="utf-8") as f:
    filtered_lines = [line for line in f if line.strip() not in lines_to_remove]

# Save the filtered content to a new file
with open(output_file, "w", encoding="utf-8") as f:
    f.writelines(filtered_lines)

print(f"Filtered dependencies saved in '{output_file}'")
