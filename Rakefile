task :default do
  system("foreman start")
end

task :spec do
  if File.exists?("/Users")
    system("open run_specs.html")
  else
    puts "Open 'run_specs.html' to run the specs."
  end
end

task :release_stable do
  cmd = "cp lib/macruby-docs.js lib/macruby-docs.stable.js"
  puts "Running: #{cmd}"
  system(cmd)
end

task :release_edge do
  cmd = "cp lib/macruby-docs.js lib/macruby-docs.edge.js"
  puts "Running: #{cmd}"
  system(cmd)
end
