# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.13

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /home/antoine/Install/clion-2018.3.2/bin/cmake/linux/bin/cmake

# The command to remove a file.
RM = /home/antoine/Install/clion-2018.3.2/bin/cmake/linux/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/antoine/Code/dom-boids/boids

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/antoine/Code/dom-boids/boids/cmake-build-debug

# Include any dependencies generated for this target.
include CMakeFiles/boids.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/boids.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/boids.dir/flags.make

CMakeFiles/boids.dir/main.cpp.o: CMakeFiles/boids.dir/flags.make
CMakeFiles/boids.dir/main.cpp.o: ../main.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/boids.dir/main.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/boids.dir/main.cpp.o -c /home/antoine/Code/dom-boids/boids/main.cpp

CMakeFiles/boids.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/boids.dir/main.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antoine/Code/dom-boids/boids/main.cpp > CMakeFiles/boids.dir/main.cpp.i

CMakeFiles/boids.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/boids.dir/main.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antoine/Code/dom-boids/boids/main.cpp -o CMakeFiles/boids.dir/main.cpp.s

CMakeFiles/boids.dir/map.pb.cc.o: CMakeFiles/boids.dir/flags.make
CMakeFiles/boids.dir/map.pb.cc.o: ../map.pb.cc
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object CMakeFiles/boids.dir/map.pb.cc.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/boids.dir/map.pb.cc.o -c /home/antoine/Code/dom-boids/boids/map.pb.cc

CMakeFiles/boids.dir/map.pb.cc.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/boids.dir/map.pb.cc.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antoine/Code/dom-boids/boids/map.pb.cc > CMakeFiles/boids.dir/map.pb.cc.i

CMakeFiles/boids.dir/map.pb.cc.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/boids.dir/map.pb.cc.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antoine/Code/dom-boids/boids/map.pb.cc -o CMakeFiles/boids.dir/map.pb.cc.s

CMakeFiles/boids.dir/src/Map.cpp.o: CMakeFiles/boids.dir/flags.make
CMakeFiles/boids.dir/src/Map.cpp.o: ../src/Map.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object CMakeFiles/boids.dir/src/Map.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/boids.dir/src/Map.cpp.o -c /home/antoine/Code/dom-boids/boids/src/Map.cpp

CMakeFiles/boids.dir/src/Map.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/boids.dir/src/Map.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antoine/Code/dom-boids/boids/src/Map.cpp > CMakeFiles/boids.dir/src/Map.cpp.i

CMakeFiles/boids.dir/src/Map.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/boids.dir/src/Map.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antoine/Code/dom-boids/boids/src/Map.cpp -o CMakeFiles/boids.dir/src/Map.cpp.s

CMakeFiles/boids.dir/src/Pos2D.cpp.o: CMakeFiles/boids.dir/flags.make
CMakeFiles/boids.dir/src/Pos2D.cpp.o: ../src/Pos2D.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building CXX object CMakeFiles/boids.dir/src/Pos2D.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/boids.dir/src/Pos2D.cpp.o -c /home/antoine/Code/dom-boids/boids/src/Pos2D.cpp

CMakeFiles/boids.dir/src/Pos2D.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/boids.dir/src/Pos2D.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antoine/Code/dom-boids/boids/src/Pos2D.cpp > CMakeFiles/boids.dir/src/Pos2D.cpp.i

CMakeFiles/boids.dir/src/Pos2D.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/boids.dir/src/Pos2D.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antoine/Code/dom-boids/boids/src/Pos2D.cpp -o CMakeFiles/boids.dir/src/Pos2D.cpp.s

CMakeFiles/boids.dir/src/Core.cpp.o: CMakeFiles/boids.dir/flags.make
CMakeFiles/boids.dir/src/Core.cpp.o: ../src/Core.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building CXX object CMakeFiles/boids.dir/src/Core.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/boids.dir/src/Core.cpp.o -c /home/antoine/Code/dom-boids/boids/src/Core.cpp

CMakeFiles/boids.dir/src/Core.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/boids.dir/src/Core.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antoine/Code/dom-boids/boids/src/Core.cpp > CMakeFiles/boids.dir/src/Core.cpp.i

CMakeFiles/boids.dir/src/Core.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/boids.dir/src/Core.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antoine/Code/dom-boids/boids/src/Core.cpp -o CMakeFiles/boids.dir/src/Core.cpp.s

CMakeFiles/boids.dir/src/Boid.cpp.o: CMakeFiles/boids.dir/flags.make
CMakeFiles/boids.dir/src/Boid.cpp.o: ../src/Boid.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Building CXX object CMakeFiles/boids.dir/src/Boid.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/boids.dir/src/Boid.cpp.o -c /home/antoine/Code/dom-boids/boids/src/Boid.cpp

CMakeFiles/boids.dir/src/Boid.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/boids.dir/src/Boid.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antoine/Code/dom-boids/boids/src/Boid.cpp > CMakeFiles/boids.dir/src/Boid.cpp.i

CMakeFiles/boids.dir/src/Boid.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/boids.dir/src/Boid.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antoine/Code/dom-boids/boids/src/Boid.cpp -o CMakeFiles/boids.dir/src/Boid.cpp.s

CMakeFiles/boids.dir/src/Flock.cpp.o: CMakeFiles/boids.dir/flags.make
CMakeFiles/boids.dir/src/Flock.cpp.o: ../src/Flock.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Building CXX object CMakeFiles/boids.dir/src/Flock.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/boids.dir/src/Flock.cpp.o -c /home/antoine/Code/dom-boids/boids/src/Flock.cpp

CMakeFiles/boids.dir/src/Flock.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/boids.dir/src/Flock.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antoine/Code/dom-boids/boids/src/Flock.cpp > CMakeFiles/boids.dir/src/Flock.cpp.i

CMakeFiles/boids.dir/src/Flock.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/boids.dir/src/Flock.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antoine/Code/dom-boids/boids/src/Flock.cpp -o CMakeFiles/boids.dir/src/Flock.cpp.s

CMakeFiles/boids.dir/src/HttpServer.cpp.o: CMakeFiles/boids.dir/flags.make
CMakeFiles/boids.dir/src/HttpServer.cpp.o: ../src/HttpServer.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_8) "Building CXX object CMakeFiles/boids.dir/src/HttpServer.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/boids.dir/src/HttpServer.cpp.o -c /home/antoine/Code/dom-boids/boids/src/HttpServer.cpp

CMakeFiles/boids.dir/src/HttpServer.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/boids.dir/src/HttpServer.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antoine/Code/dom-boids/boids/src/HttpServer.cpp > CMakeFiles/boids.dir/src/HttpServer.cpp.i

CMakeFiles/boids.dir/src/HttpServer.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/boids.dir/src/HttpServer.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antoine/Code/dom-boids/boids/src/HttpServer.cpp -o CMakeFiles/boids.dir/src/HttpServer.cpp.s

# Object files for target boids
boids_OBJECTS = \
"CMakeFiles/boids.dir/main.cpp.o" \
"CMakeFiles/boids.dir/map.pb.cc.o" \
"CMakeFiles/boids.dir/src/Map.cpp.o" \
"CMakeFiles/boids.dir/src/Pos2D.cpp.o" \
"CMakeFiles/boids.dir/src/Core.cpp.o" \
"CMakeFiles/boids.dir/src/Boid.cpp.o" \
"CMakeFiles/boids.dir/src/Flock.cpp.o" \
"CMakeFiles/boids.dir/src/HttpServer.cpp.o"

# External object files for target boids
boids_EXTERNAL_OBJECTS =

boids: CMakeFiles/boids.dir/main.cpp.o
boids: CMakeFiles/boids.dir/map.pb.cc.o
boids: CMakeFiles/boids.dir/src/Map.cpp.o
boids: CMakeFiles/boids.dir/src/Pos2D.cpp.o
boids: CMakeFiles/boids.dir/src/Core.cpp.o
boids: CMakeFiles/boids.dir/src/Boid.cpp.o
boids: CMakeFiles/boids.dir/src/Flock.cpp.o
boids: CMakeFiles/boids.dir/src/HttpServer.cpp.o
boids: CMakeFiles/boids.dir/build.make
boids: CMakeFiles/boids.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_9) "Linking CXX executable boids"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/boids.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/boids.dir/build: boids

.PHONY : CMakeFiles/boids.dir/build

CMakeFiles/boids.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/boids.dir/cmake_clean.cmake
.PHONY : CMakeFiles/boids.dir/clean

CMakeFiles/boids.dir/depend:
	cd /home/antoine/Code/dom-boids/boids/cmake-build-debug && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/antoine/Code/dom-boids/boids /home/antoine/Code/dom-boids/boids /home/antoine/Code/dom-boids/boids/cmake-build-debug /home/antoine/Code/dom-boids/boids/cmake-build-debug /home/antoine/Code/dom-boids/boids/cmake-build-debug/CMakeFiles/boids.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/boids.dir/depend

